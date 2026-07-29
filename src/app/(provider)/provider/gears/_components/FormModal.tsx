import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { apiUrl } from '@/config/accessEnv';
import handleErrors, { ErrorResponse } from '@/lib/error-handler';
import { gearFormSchema, TGearFormInput } from '@/lib/validations/gearSchema';
import { ICategory } from '@/types/categoriy.type';
import { IGear } from '@/types/gear.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

type Props = {
  setIsSelected?: React.Dispatch<React.SetStateAction<IGear | null>>;
  isSelected?: IGear | null;
  fetchData: () => Promise<void>
}
const FormModal = ({ isSelected, setIsSelected,fetchData }: Props) => {

  const isEdit = !!isSelected;

  console.log({isSelected});
  



  const [categories, setCategories] = useState<ICategory[]>([])

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TGearFormInput>({
    resolver: zodResolver(gearFormSchema),
    defaultValues: {},
  });



  useEffect(() => {
    (async function () {
      try {

        const res = await fetch(`${apiUrl}/categories`, {
          method: "GET",
        })

        const data = await res.json();
        const categori = data.data.categories;
        setCategories(categori)

      } catch (error) {
        handleErrors(error as ErrorResponse)
      }
    })()
  }, [])

  const statusValue = watch("status");
  const featureValue = watch("feature");

  async function onSubmit(values: TGearFormInput) {
    setIsSubmitting(true);
    try {
      // এখানে ডাটাবেজে পাঠানোর আগে ইমেজ আপলোড লজিক হবে

      const payload = {
        title: values.title,
        brand: values.brand,
        description: values.description,
        categoryId: values.categoryId,
        pricePerDay: values.pricePerDay,
        stock: values.stock,
        status: values.status,
        images: ["https://png.pngtree.com/png-clipart/20240307/original/pngtree-gear-wheel-png-free-download-png-image_14531772.png"],
      };

      console.log({ payload });



      const res = await fetch(`${apiUrl}/provider/gear`, {
        method: "POST",
        headers: {
          "Content-type": "Application/json",

        },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      const data = await res.json()

      if(data.success){
        fetchData()
        setIsSelected && setIsSelected(null)
      }

      console.log("Final Prisma Payload:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }


  useEffect(() => {
    if(!isSelected)return;
    if(isEdit){
      reset({
        brand : isSelected?.brand || '',
        categoryId: isSelected?.category?.id,
        title: isSelected?.title,
        pricePerDay: isSelected?.pricePerDay,
        description: isSelected?.description || '',
        feature: isSelected?.feature,
        status: isSelected?.status,
        images: isSelected?.images || [],
        stock : isSelected?.stock,
      })
    }
  },[isSelected])

  return (
    <Dialog open={!!isSelected} onOpenChange={() => setIsSelected && setIsSelected(null) } >
      <DialogTrigger>
        <Button className="w-full sm:w-auto shadow-md font-medium flex items-center gap-2 bg-primary hover:bg-primary/95 text-primary-foreground transition-all duration-200">
          <Plus className="h-4 w-4 stroke-3" /> Add New Gear
        </Button>
      </DialogTrigger>
      <DialogContent className={'min-w-200'}>
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl font-bold"> {isEdit ? "Update Gear":"Add new Gear"} </h2>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto p-6 ">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Gear Title</Label>
              <Input id="title" placeholder="e.g. Sony Alpha 7 IV" {...register("title")} />
              {errors.title && <p className="text-sm font-medium text-destructive">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Brand */}
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" placeholder="e.g. Sony" {...register("brand")} />
                {errors.brand && <p className="text-sm font-medium text-destructive">{errors.brand.message}</p>}
              </div>

              {/* Category (HTML Select using Tailwind Styles) */}
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <select
                  id="categoryId"
                  {...register("categoryId")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-sm font-medium text-destructive">{errors.categoryId.message}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe the gear condition, features, etc." {...register("description")} />
              {errors.description && <p className="text-sm font-medium text-destructive">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Per Day */}
              <div className="space-y-2">
                <Label htmlFor="pricePerDay">Price Per Day ($)</Label>
                <Input id="pricePerDay" type="number" placeholder="50" {...register("pricePerDay")} />
                {errors.pricePerDay && <p className="text-sm font-medium text-destructive">{errors.pricePerDay.message}</p>}
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <Label htmlFor="stock">Available Stock</Label>
                <Input id="stock" type="number" placeholder="10" {...register("stock")} />
                {errors.stock && <p className="text-sm font-medium text-destructive">{errors.stock.message}</p>}
              </div>
            </div>

            {/* Images Multiple Input */}
            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input id="images" placeholder="e.g. Sony Alpha 7 IV" {...register("images")} />
              {errors.images && <p className="text-sm font-medium text-destructive">{errors.images.message}</p>}
            </div>

            {/* Status (Switch) */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base" htmlFor="status">Available for Rent</Label>
                <p className="text-sm text-muted-foreground">Turn off if you want to temporarily hide this gear.</p>
              </div>
              <Switch
                id="status"
                checked={statusValue}
                onCheckedChange={(checked) => setValue("status", checked, { shouldValidate: true })}
              />
            </div>


            {/* Status (Switch) */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base" htmlFor="status">Feature for show home page</Label>
                <p className="text-sm text-muted-foreground">Turn off if you want to temporarily hide this gear.</p>
              </div>
              <Switch
                id="feature"
                checked={featureValue}
                onCheckedChange={(checked) => setValue("feature", checked, { shouldValidate: true })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Submit Gear"}
            </Button>
          </form>
        </DialogDescription>

      </DialogContent>
    </Dialog>
  )
}

export default FormModal