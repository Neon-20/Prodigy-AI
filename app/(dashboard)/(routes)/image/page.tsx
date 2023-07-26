"use client";

import { Heading } from "@/components/heading";
import * as z from "zod";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { 
    Select,
    SelectValue,
    SelectContent,
    SelectTrigger,
    SelectItem
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModel } from "@/hooks/use-pro-model";
import toast from "react-hot-toast";




const ImagePage = () => {

const proModel = useProModel();

const [images, setImages] = useState<string[]>([]);

const router = useRouter();
//  Create functions for the form to use
const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        prompt:"",
        amount:"1",
        resolution:"512x512"
    }
});

const isLoading = form.formState.isSubmitting;

const onSubmit = async(values:z.infer<typeof formSchema>) =>{
    try{
    setImages([]);
    const response = await axios.post("/api/image",values);

    const urls = response.data.map((image:{url:string}) => image.url);
    
    setImages(urls);

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
    title="Image Generation"
    description="Generate High Quality Images with our AI Model"
    icon={ImageIcon}
    iconColor="text-pink-700"
    bgColor="bg-pink-700/10"
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
                <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                    <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="Dazzling picture of Naruto and Sasuke fighting 💪" 
                        {...field}
                    />
                    </FormControl>
                </FormItem>
                )}
            />
            <FormField
            control={form.control}
            name="amount"
            render = {({ field })=>(
                <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    >
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {amountOptions.map((option)=>(
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                        {option.label}
                        </SelectItem> 
                        ))}
                    </SelectContent>
                    </Select>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="resolution"
            render = {({ field })=>(
                <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    >
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {resolutionOptions.map((option)=>(
                        <SelectItem
                        key={option.value}
                        value={option.value}
                        >
                        {option.label}
                        </SelectItem> 
                        ))}
                    </SelectContent>
                    </Select>
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
            <div className="p-20">
            <Loader/>
            </div>
        )}
        {images.length === 0 && !isLoading &&(
            <div>
                <Empty label="No Images Generated"/>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {/* Images are rendered here */}
        {images.map((src)=>(
            <Card
            key={src}
            className="rounded-lg overflow-hidden"
            >
            <div className="relative aspect-square">
                <Image
                alt="image"
                fill
                src={src}
                />
            </div>
            <CardFooter className="p-2">
                <Button 
                onClick = {() => window.open(src)}
                variant="secondary" 
                className="w-ful;">
                <Download className="h-4 w-4 mr-2"/>
                View & Download
                </Button>
            </CardFooter>
            </Card>
        ))}
        </div>
        </div>
    </div>
</div>
)
}

export default ImagePage;