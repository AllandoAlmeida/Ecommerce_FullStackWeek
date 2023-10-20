import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";
import { DiscountBadge } from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[170px] w-full  items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            className="max-h[70%] h-auto w-auto max-w-[80%] md:max-h-[150px]"
            style={{
              objectFit: "contain",
            }}
            alt={`imagem do produto ${product.name}`}
          />
          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>
          {product.discountPercentage > 0 ? (
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <p className="font-semibold">
                R$ {product.totalPrice.toFixed(2)}
              </p>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <p className="opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
