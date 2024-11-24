import * as React from "react"
import { Link } from "react-router-dom";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getProducts, getProduct } from "@/api/adminApi";

export default function AdminProduct() {
  const [data, setData] = React.useState([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);

  const columns = [
    {
      accessorKey: "product_id",
      header: "Product Id",
      cell: ({ row }) => <div>{row.getValue("product_id")}</div>,
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => (
        <div>{row.getValue("brand")}</div>
      ),
    },
    {
      accessorKey: "model",
      header: "Model",
      cell: ({ row }) => (
        <div>{row.getValue("model")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div>Price</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price")) / 100
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "CAD",
        }).format(amount)
  
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "stock",
      header: "Stock Quantity",
      cell: ({ row }) => (
        <div>{row.getValue("stock")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product_id = row.original.product_id
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product_id)}
              >
                Copy Product Id
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link to={`edit/${product_id}`} className="w-full">Modify</ Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      data,
    },
  })

  const fetchProducts = async (page) => {
    try {
      const offset = (page - 1) * itemsPerPage;
      return await getProducts(offset, itemsPerPage);
    } catch (error) {
      console.error("get products error, ", error)
      return [];
    }
  };

  React.useEffect(() => {
    pageLoad(currentPage)
  }, []);

  const parseProduct = (product) => {
    const { product_id, model, brand, price,  stock: {quantity}} = product;
    return {product_id, model, brand, price, stock: quantity};
  }

  const pageLoad = async (page) => {
    if (page < 1) {
      return;
    }
    const products = await fetchProducts(page)
    if (products.length == 0) {
      return;
    }
    setData(products.map(v => parseProduct(v)));
    setCurrentPage(page);
  }

  const pageUp = () => {
    pageLoad(currentPage + 1);
  }

  const pageDown = () => {
    pageLoad(currentPage - 1);
  }

  const handleFilter = async (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value;
      if (value == '' || !Number.isInteger(Number(value))) {
        pageLoad(currentPage)
        return;
      }
      try {
        const product = await getProduct(e.target.value);
        if (!product) {
          setData([]);
          return;
        }
        setData([parseProduct(product)]);
      } catch (error) {
        console.error("get products error, ", error)
      }

    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between py-4">
        <Input
          placeholder="Filter Product Id..."
          onKeyDown={handleFilter}
          className="max-w-sm"
        />
        <Button><Link to={`create`} className="w-full">New Product</ Link></Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination className="py-4">
      <PaginationContent>
        <PaginationItem onClick={pageDown} className="select-none cursor-pointer" >
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem onClick={pageUp} className="select-none cursor-pointer" >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
  )
}
