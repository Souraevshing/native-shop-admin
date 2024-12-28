"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import {
  createCategory,
  deleteCategory,
  imageUploadHandler,
  updateCategory,
} from "@/actions/fetch-category";
import { CategoryForm } from "@/app/admin/categories/_components/category-form";
import { CategoryTableRow } from "@/app/admin/categories/_components/category-table-row";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  createCategorySchema,
  CreateCategorySchema,
} from "@/schemas/create-category.schema";
import {
  CategoriesWithProductsResponse,
  CategoryWithProducts,
} from "../../../../../types/types";

export default function CategoriesItemPage({
  categories,
}: {
  categories: CategoriesWithProductsResponse;
}) {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<CreateCategorySchema | null>(null);

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const { showSuccess, showError, showInfo, showPromise } = useToast();
  const router = useRouter();

  const submitCategoryHandler: SubmitHandler<CreateCategorySchema> = async (
    data
  ) => {
    const { image, name, intent = "create" } = data;

    const handleImageUpload = async () => {
      const uniqueId = uuid();
      const fileName = `category/category-${uniqueId}`;
      const file = new File([data.image[0]], fileName);
      const formData = new FormData();
      formData.append("file", file);
      showPromise(imageUploadHandler(formData), {
        loading: "Uploading Image",
        success: "Image uploaded successfully",
        error: "Error uploading image",
      });
      return imageUploadHandler(formData);
    };

    switch (intent) {
      case "create": {
        const imageUrl = await handleImageUpload();

        if (imageUrl) {
          await createCategory({ imageUrl, name });
          form.reset();
          router.refresh();
          setIsCreateCategoryModalOpen(false);
          showSuccess("Category created successfully");
        }
        break;
      }
      case "update": {
        if (image && currentCategory?.slug) {
          const imageUrl = await handleImageUpload();

          if (imageUrl) {
            await updateCategory({
              imageUrl,
              name,
              slug: currentCategory.slug,
              intent: "update",
            });
            form.reset();
            router.refresh();
            setIsCreateCategoryModalOpen(false);
            showInfo("Category updated successfully");
          }
        }
      }

      default:
        showError("Invalid intent");
        console.error("Invalid intent");
    }
  };

  const deleteCategoryHandler = async (id: number) => {
    await deleteCategory(id);
    router.refresh();
    showError("Category deleted successfully");
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center my-10">
        <div className="ml-auto flex items-center gap-2">
          <Dialog
            open={isCreateCategoryModalOpen}
            onOpenChange={() =>
              setIsCreateCategoryModalOpen(!isCreateCategoryModalOpen)
            }
          >
            <DialogTrigger asChild>
              <Button
                size={"sm"}
                variant={"outline"}
                className="h-8 gap-1"
                onClick={() => {
                  setCurrentCategory(null);
                  setIsCreateCategoryModalOpen(true);
                }}
              >
                <PlusCircleIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
              </DialogHeader>
              <CategoryForm
                form={form}
                onSubmit={submitCategoryHandler}
                defaultValues={currentCategory}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>

        <CardContent>
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="md:table-cell">Created at</TableHead>
                <TableHead className="md:table-cell">Products</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: CategoryWithProducts) => (
                <CategoryTableRow
                  key={category.id}
                  category={category}
                  setCurrentCategory={setCurrentCategory}
                  setIsCreateCategoryModalOpen={setIsCreateCategoryModalOpen}
                  deleteCategoryHandler={deleteCategoryHandler}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
