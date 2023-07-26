import Stripe from "stripe";
import { headers } from "next/headers";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";


export async function POST(req:Request){
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    
    let event: Stripe.Event;

    try{
    event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET! // local development only!
    )
    }
    catch(e:any){
    return new NextResponse(`Webhook Error: ${e.message}`,{status: 400})
    }
    
    //We are going to look for 2 events only:
    //1.Creating the new transac.
    //2. Updating or deleting

    const session = event.data.object as Stripe.Checkout.Session;
    if(event.type === "checkout.session.completed"){
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        if(!session?.metadata?.userId){
            return new NextResponse("User Id Is required",{status:400});
        }

        await prismadb.userSubscription.create({
            data:{
                userId:session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId:subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end*1000)
            },
        });
    }
    // If user subscription expired
    if(event.type === 'invoice.payment_succeeded'){
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );
        await prismadb.userSubscription.update({
            where:{
                stripeSubscriptionId: subscription.id
            },
            data:{
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end*1000
                ),
            }
        })
    }
    return new NextResponse(null,{status:200})
}