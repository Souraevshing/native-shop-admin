"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import { imageUploadHandler } from "@/actions/fetch-category";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/actions/fetch-product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/useToast";
import {
  createOrUpdateProductSchema,
  CreateOrUpdateProductSchema,
} from "@/schemas/create-product.schema";
import {
  Category,
  ProductsWithCategoriesResponse,
} from "../../../../../types/types";
import { ProductForm } from "./product-form";
import { ProductTableRow } from "./product-table-row";

export default function ProductsItemPage({
  categories,
  productsWithCategories,
}: {
  categories: Category[];
  productsWithCategories: ProductsWithCategoriesResponse;
}) {
  const [currentProduct, setCurrentProduct] =
    useState<CreateOrUpdateProductSchema | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const form = useForm<CreateOrUpdateProductSchema>({
    resolver: zodResolver(createOrUpdateProductSchema),
    defaultValues: {
      title: "",
      category: undefined,
      price: undefined,
      maxQuantity: undefined,
      heroImage: undefined,
      images: [],
      intent: "create",
    },
  });

  const { showSuccess, showError, showInfo, showPromise } = useToast();

  const router = useRouter();

  // upload multiple images by unique url
  const uploadFile = async (file: File) => {
    const uniqueId = uuid();
    const fileName = `product/product-${uniqueId}-${file.name}`;
    const formData = new FormData();
    formData.append("file", file, fileName);
    return imageUploadHandler(formData);
  };

  const productCreateUpdateHandler = async (
    data: CreateOrUpdateProductSchema
  ) => {
    const {
      category,
      images,
      maxQuantity,
      price,
      title,
      heroImage,
      slug,
      intent = "create",
    } = data;

    let heroImageUrl: string | undefined;
    let imageUrls: string[] = [];

    if (heroImage) {
      const imagePromise = Array.from(heroImage).map((file) =>
        uploadFile(file as File)
      );

      //merge all promises into one
      const mergedPromise = Promise.all(imagePromise);

      showPromise(mergedPromise, {
        loading: "Uploading images...",
        success: "Images uploaded successfully",
        error: "Error uploading images",
      });

      try {
        [heroImageUrl] = await mergedPromise;
      } catch (error) {
        console.error("Error uploading image:", error);
        showError("Error uploading image");
        return;
      }
    }

    if (images.length > 0) {
      const imagesPromises = Array.from(images).map((file) => uploadFile(file));

      try {
        imageUrls = (await Promise.all(imagesPromises)) as string[];
      } catch (error) {
        console.error("Error uploading images:", error);
        showError("Error uploading images");
        return;
      }
    }

    try {
      switch (intent) {
        case "create": {
          if (heroImageUrl && imageUrls.length > 0) {
            await createProduct({
              category: Number(category),
              images: imageUrls,
              heroImage: heroImageUrl,
              maxQuantity: Number(maxQuantity),
              price: Number(price),
              title,
            });
            form.reset();
            router.refresh();
            setIsProductModalOpen(false);
            showSuccess("Product created successfully");
          }
          break;
        }
        case "update": {
          if (heroImageUrl && imageUrls.length > 0 && slug) {
            await updateProduct({
              category: Number(category),
              heroImage: heroImageUrl!,
              imagesUrl: imageUrls,
              maxQuantity: Number(maxQuantity),
              price: Number(price),
              title,
              slug,
            });
            form.reset();
            router.refresh();
            setIsProductModalOpen(false);
            showInfo("Product updated successfully");
          }
          break;
        }

        default:
          console.error("Invalid intent");
          showError("Invalid intent");
      }
    } catch (err) {
      if (err instanceof Error) {
        showError(err.message);
      } else {
        showError("Error deleting product");
      }
    }
  };

  const deleteProductHandler = async () => {
    if (currentProduct?.slug) {
      try {
        await deleteProduct(currentProduct.slug);
        router.refresh();
        showSuccess("Product deleted successfully");
        setIsDeleteModalOpen(false);
        setCurrentProduct(null);
      } catch (err) {
        if (err instanceof Error) {
          showError(err.message);
        } else {
          showError("Error deleting product");
        }
      }
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products </h1>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => {
              setCurrentProduct(null);
              setIsProductModalOpen(true);
            }}
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Max Quantity</TableHead>
              <TableHead>Hero Image</TableHead>
              <TableHead>Product Images</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsWithCategories.map((product) => (
              <ProductTableRow
                setIsProductModalOpen={setIsProductModalOpen}
                key={product.id}
                product={product}
                setCurrentProduct={setCurrentProduct}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            ))}
          </TableBody>
        </Table>

        {/* Product Modal */}
        <ProductForm
          form={form}
          onSubmit={productCreateUpdateHandler}
          categories={categories}
          isProductModalOpen={isProductModalOpen}
          setIsProductModalOpen={setIsProductModalOpen}
          defaultValues={currentProduct}
        />

        {/* Delete Product Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete {currentProduct?.title}</p>
            <DialogFooter>
              <Button variant="destructive" onClick={deleteProductHandler}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
