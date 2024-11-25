import * as React from "react";
import { getProducts } from "@/api/productApi";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const brand = [
  {
    id: "Apple",
    label: "Apple",
  },
  {
    id: "Dell",
    label: "Dell",
  }
]

const category = [
  {
    id: "Ultrabook",
    label: "Ultrabook",
  },
]


function Home() {
  const [products, setProducts] = React.useState([]);

  const fetchProducts = async (queryParams) => {
    try {
      const data = await getProducts(queryParams);
      setProducts(data);
    } catch (error) {
      console.error("get products error, ", error)
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const form = useForm({
    defaultValues: {
      brand: [],
      category: [],
      search: ""
    },
  })

  function onSubmit(data) {
    fetchProducts(data)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center my-3">
      <div className="flex-none flex flex-col space-y-4 mx-12 mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Search Products" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="brand"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Brands</FormLabel>
                  </div>
                  {brand.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="brand"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Category</FormLabel>
                  </div>
                  {category.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="category"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
      </div>
      <div className="mx-8 flex flex-wrap">
        {products.map(product => <ProductCard key={product.product_id} product={product} className='w-full lg:w-1/5 mx-3 mb-6' />)}
      </div>
    </div>
  );
}

export default Home;