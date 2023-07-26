"use client";

import { Heading } from "@/components/heading";
import * as z from "zod";
import {  VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModel } from "@/hooks/use-pro-model";
import toast from "react-hot-toast";



const VideoPage = () => {

const proModel = useProModel();

const [video, setVideo] = useState<string>(); // 

const router = useRouter();
//  Create functions for the form to use
const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        prompt:""
    }
});

const isLoading = form.formState.isSubmitting;

const onSubmit = async(values:z.infer<typeof formSchema>) =>{
    try{

    setVideo(undefined);

    const response = await axios.post("/api/video",values);
    
    setVideo(response.data[0]);
    
    form.reset()

    }
    catch(e:any){
    if(e?.response?.status === 403){
        proModel.onOpen();
    }
    else{
        toast.error("Something went wrong");
    }
    }
    finally{
    router.refresh();
    }
}


return (
    <div>
    <Heading 
    title="Video Generation"
    description="Generate Video with a Simple Prompt"
    icon={VideoIcon}
    iconColor="text-orange-700"
    bgColor="bg-orange-700/10"
    />
    {/* Building the Form below */}
    <div className="px-4 lg:px-8">
    <div>
        <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border w-full p-4 px-3
        md:px-6 focus-within:shadow-sm  grid grid-cols-12 gap-2
        "
        >
        <FormField
                name="prompt"
                render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                    <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="Shark swimming around a coral reef." 
                        {...field}
                    />
                    </FormControl>
                </FormItem>
                )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
            </Button>
        </form>
        </Form>
        </div>
        {/* Creating styles for the answer */}
        <div className="space-y-4 mt-4">
        {/* Create component for the loading state */}
        {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center
            justify-center bg-black">
            <Loader/>
            </div>
        )}
        {!video&& !isLoading &&(
            <div>
                <Empty label="No Video Generated"/>
            </div>
        )}
        
            {/* Change this to actual audio file */}
            {video && (
                <video className="w-auto aspect-video mt-8 rounded-lg border-black" controls>
                    <source src={video}/>
                </video>
            )}
        </div>
    </div>
</div>
)
}

export default VideoPage;