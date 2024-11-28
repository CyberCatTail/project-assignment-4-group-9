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
    id: "Acer",
    label: "Acer",
  },
  {
    id: "Apple",
    label: "Apple",
  },
  {
    id: "Asus",
    label: "Asus",
  },
  {
    id: "Chuwi",
    label: "Chuwi",
  },
  {
    id: "Dell",
    label: "Dell",
  },
  {
    id: "Fujitsu",
    label: "Fujitsu",
  },
  {
    id: "Google",
    label: "Google",
  },
  {
    id: "HP",
    label: "HP",
  },
  {
    id: "Huawei",
    label: "Huawei",
  },
  {
    id: "Lenovo",
    label: "Lenovo",
  },
  {
    id: "LG",
    label: "LG",
  },
  {
    id: "Mediacom",
    label: "Mediacom",
  },
  {
    id: "Microsoft",
    label: "Microsoft",
  },
  {
    id: "MSI",
    label: "MSI",
  },
  {
    id: "Razer",
    label: "Razer",
  },
  {
    id: "Samsung",
    label: "Samsung",
  },
  {
    id: "Vero",
    label: "Vero",
  },
  {
    id: "Toshiba",
    label: "Toshiba",
  }
]

const category = [
  {
    id: "Ultrabook",
    label: "Ultrabook",
  },
  {
    id: "Workstation",
    label: "Workstation",
  },
  {
    id: "Gaming",
    label: "Gaming",
  },
  {
    id: "2 in 1 Convertible",
    label: "2 in 1 Convertible",
  },
  {
    id: "Netbook",
    label: "Netbook",
  },
  {
    id: "Notebook",
    label: "Notebook",
  },
]
const ITEM_PER_PAGE = 8;

function Home() {
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchProducts = async (queryParams) => {
    try {
      const data = await getProducts(queryParams);
      setProducts(data);
      setCurrentPage(1);
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

  const startIndex = (currentPage - 1)* ITEM_PER_PAGE;
  const currentProducts = products.slice(startIndex,startIndex + ITEM_PER_PAGE);

  const totalPages = Math.ceil(products.length / ITEM_PER_PAGE);

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
      {currentProducts.map((product) => (
          <ProductCard key={product.product_id} product={product} className="w-full lg:w-1/5 mx-3 mb-6" />
        ))}
      </div>

      <div className="flex flex-col items-center space-y-2 mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Home;