import { auth,currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import {stripe} from "@/lib/stripe";

import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET(){
    try{
    const {userId} = auth();
    const user = await currentUser();

    if(!user || !userId){
    return new NextResponse("Unauthorised",{status:401});
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
        where:{
            userId
        }
    });

    // If user already has subscription page we would redirect them to 
    // cancel user subscription page or updgrade page
    if(userSubscription && userSubscription.stripeCustomerId){
    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
    });
    return new NextResponse(JSON.stringify({url:stripeSession.url}))
    }
    
    // User first time subscribing to our application
    const stripeSession = await stripe.checkout.sessions.create({
        success_url:settingsUrl,
        cancel_url:settingsUrl,
        payment_method_types:["card"],
        mode:"subscription",
        billing_address_collection:"auto",
        customer_email:user.emailAddresses[0].emailAddress,
        line_items:[
            {
                price_data:{
                currency:"USD",
                product_data:{
                    name:"Prodigy_Pro",
                    description:"Unlimited AI Prompts"
                },
            unit_amount:2000,
            recurring:{
                interval:'month',
            }
            },
            quantity:1,
        }
        ],
        metadata:{
            userId,
        }
    })

    return new NextResponse(JSON.stringify({url:stripeSession.url}));
    
    }
    catch(e){
        console.log("STRIPE_ERROR");
        return new NextResponse("Internal Error",{status:500});
    }
}

