import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const products = [
  "Rice",
  "Oats",
  "Bananas",
  "Carrots",
  "Eggs",
  "Berries",
  "Honey",
  "Nuts",
  "Apples",
  "Milk",
  "Cheese",
  "Chicken",
  "Tomatoes",
  "Cucumber",
  "Fish",
  "Yogurt",
]

export function ComboboxDropdownMenu() {
  const [openProducts, setOpenProducts] = React.useState(false)
  const [openAllergens, setOpenAllergens] = React.useState(false)
  const [selectedProducts, setSelectedProducts] = React.useState([])
  const [selectedAllergens, setSelectedAllergens] = React.useState([])

  const handleSelectProduct = (product) => {
    // Check if the product is already in the allergens list
    if (selectedAllergens.includes(product)) {
      return
    }

    // If the product is not in the allergens list, add/remove it from the products list
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((item) => item !== product))
    } else {
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const handleSelectAllergen = (allergen) => {
    // Check if the allergen is already in the products list
    if (selectedProducts.includes(allergen)) {
      return
    }

    // If the allergen is not in the products list, add/remove it from the allergens list
    if (selectedAllergens.includes(allergen)) {
      setSelectedAllergens(selectedAllergens.filter((item) => item !== allergen))
    } else {
      setSelectedAllergens([...selectedAllergens, allergen])
    }
  }

  const removeProduct = (product) => {
    setSelectedProducts(selectedProducts.filter((item) => item !== product))
  }

  const removeAllergen = (allergen) => {
    setSelectedAllergens(selectedAllergens.filter((item) => item !== allergen))
  }

  return (
    <div className="flex w-full flex-col gap-3 p-3 md:p-6 max-w-full">
      {/* Mobile view*/}
      <div className="md:hidden border border-gray-400 rounded-md bg-white p-2 min-h-[50px] w-full max-[425px]:w-3/4 max-[425px]:mx-auto sm:mb-3">
        <div className="flex flex-wrap gap-1.5">
          {/* Products*/}
          {selectedProducts.map((product) => (
            <div
              key={`product-${product}`}
              className="flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-3 py-1 text-sm"
            >
              <X className="h-4 w-4 cursor-pointer" onClick={() => removeProduct(product)} />
              {product}
            </div>
          ))}

          {/* Allergens */}
          {selectedAllergens.map((allergen) => (
            <div
              key={`allergen-${allergen}`}
              className="flex items-center gap-1 rounded-full bg-accent-negative text-accent-negative-foreground px-3 py-1 text-sm"
            >
              <X className="h-4 w-4 cursor-pointer" onClick={() => removeAllergen(allergen)} />
              {allergen}
            </div>
          ))}
        </div>
      </div>

      {/* Tablet view */}
      <div className="hidden md:flex xl:hidden md:flex-col md:gap-6 w-full">
        {/* Products*/}
        <div className="flex flex-col gap-2">
          <h3 className="text-base">Products you would like to see in the dishes:</h3>
          <div className="border border-dashed border-gray-400 rounded-md bg-white p-1.5 md:min-h-9 w-full">
            <div className="grid grid-cols-6 gap-2">
              {selectedProducts.map((product) => (
                <div
                  key={`product-${product}`}
                  className="flex items-center justify-center gap-1 md:justify-start md:gap-3 rounded-full bg-accent text-accent-foreground px-3 py-1.5 text-sm"
                >
                  <X className="h-4 w-4 cursor-pointer" onClick={() => removeProduct(product)} />
                  {product}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Allergens*/}
        <div className="flex flex-col gap-2">
          <h3 className="text-base">Allergens or unwanted foods:</h3>
          <div className="border border-dashed border-gray-400 rounded-md bg-white p-1.5 md:min-h-9 w-full">
            <div className="grid grid-cols-6 gap-2">
              {selectedAllergens.map((allergen) => (
                <div
                  key={`allergen-${allergen}`}
                  className="flex items-center justify-center gap-1 md:justify-start md:gap-3 rounded-full bg-accent-negative text-accent-negative-foreground px-3 py-1.5 text-sm"
                >
                  <X className="h-4 w-4 cursor-pointer" onClick={() => removeAllergen(allergen)} />
                  {allergen}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden xl:flex xl:flex-row xl:gap-4 w-full">
        {/* Products */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-base">Products you would like to see in the dishes</h3>
          <div className="border-0 bg-transparent p-0 w-full">
            <div className="grid grid-cols-4 gap-2">
              {products.slice(0, 16).map((product) => (
                <div
                  key={`product-grid-${product}`}
                  className={cn(
                    "flex items-center justify-center rounded-full px-3 py-1.5 text-sm cursor-pointer ",
                    selectedProducts.includes(product)
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-accent text-accent-foreground ",
                  )}
                  onClick={() => handleSelectProduct(product)}
                >
                  {product}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300 mx-2"></div>

        {/* Allergens section */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-base">Allergens or unwanted foods</h3>
          <div className="border-0 bg-transparent p-0 w-full">
            <div className="grid grid-cols-4 gap-2">
              {products.slice(0, 16).map((allergen) => (
                <div
                  key={`allergen-grid-${allergen}`}
                  className={cn(
                    "flex items-center justify-center rounded-full px-3 py-1.5 text-sm cursor-pointer",
                    selectedAllergens.includes(allergen)
                      ? "bg-accent-negative text-accent-negative-foreground"
                      : "bg-destructive text-destructive-foreground",
                  )}
                  onClick={() => handleSelectAllergen(allergen)}
                >
                  {allergen}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dropdowns container */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between w-full">
        <Popover open={openProducts} onOpenChange={setOpenProducts}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openProducts}
              className="min-w-[120px] sm:w-[250px] justify-between bg-primary border-gray-400 h-10 px-3 text-base font-normal xl:hidden"
            >
              Add...
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search products..." className="h-9" />
              <CommandList>
                <CommandEmpty>No products found.</CommandEmpty>
                <CommandGroup>
                  {products.map((product) => (
                    <CommandItem
                      key={product}
                      value={product}
                      onSelect={() => handleSelectProduct(product)}
                      disabled={selectedAllergens.includes(product)}
                      className={cn(selectedAllergens.includes(product) && "opacity-50 cursor-not-allowed")}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          selectedProducts.includes(product)
                            ? "border-primary bg-primary text-primary-foreground"
                            : selectedAllergens.includes(product)
                              ? "border-gray-300 bg-gray-100"
                              : "border-gray-300 bg-gray-100 opacity-50",
                        )}
                      >
                        {selectedProducts.includes(product) && <Check className="h-3 w-3" />}
                      </div>
                      {product}
                      {selectedAllergens.includes(product) && (
                        <span className="ml-auto text-xs text-red-500">In allergens</span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={openAllergens} onOpenChange={setOpenAllergens}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openAllergens}
              className="min-w-[150px] sm:w-[250px] justify-between bg-white border-gray-400 h-10 px-2 text-base font-normal xl:hidden"
            >
              Allergens...
              <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search allergens..." className="h-9" />
              <CommandList>
                <CommandEmpty>No allergens found.</CommandEmpty>
                <CommandGroup>
                  {products.map((allergen) => (
                    <CommandItem
                      key={allergen}
                      value={allergen}
                      onSelect={() => handleSelectAllergen(allergen)}
                      disabled={selectedProducts.includes(allergen)}
                      className={cn(selectedProducts.includes(allergen) && "opacity-50 cursor-not-allowed")}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          selectedAllergens.includes(allergen)
                            ? "border-red-500 bg-red-500 text-white"
                            : selectedProducts.includes(allergen)
                              ? "border-gray-300 bg-gray-100"
                              : "border-red-500 opacity-50",
                        )}
                      >
                        {selectedAllergens.includes(allergen) && <Check className="h-3 w-3" />}
                      </div>
                      {allergen}
                      {selectedProducts.includes(allergen) && (
                        <span className="ml-auto text-xs text-accent">In products</span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

