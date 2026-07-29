"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Edit2, Search, SlidersHorizontal, Trash2,
} from "lucide-react";
import FormModal from "./_components/FormModal";
import { apiUrl } from "@/config/accessEnv";
import handleErrors, { ErrorResponse } from "@/lib/error-handler";
import { IGear } from "@/types/gear.type";




export default function GearManagementPage() {
  const [gears, setGears] = useState<IGear[]>([]);
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  const [isSelected, setIsSelected] = useState<IGear | null>(null)




  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('searchTerm', searchQuery)
      const res = await fetch(`${apiUrl}/gear?${params.toString()}`, {
        method: "GET",
      })

      const data = await res.json();
      const getData = data.data.gears;
      setGears(getData)

    } catch (error) {
      handleErrors(error as ErrorResponse)
    }
  }, [searchQuery])


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [fetchData])



  const handleDelete = async (id: string) => {
    try {

      const res = await fetch(`${apiUrl}/provider/gear/${id}`, {
        method: "DELETE",
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        fetchData()
      }

    } catch (error) {
      handleErrors(error as ErrorResponse)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 space-y-8 w-full max-w-7xl mx-auto">


      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Gear Inventory
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your rental assets, availability, and daily pricing models.
          </p>
        </div>
        <div>
          <FormModal setIsSelected={setIsSelected} isSelected={isSelected} fetchData={fetchData} setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
      </div>




      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search gear title or brand..."
            className="pl-9 h-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 hidden sm:inline-flex">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      {/* ─── INVENTORY TABLE CARD ─── */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[90px] font-semibold">Image</TableHead>
              <TableHead className="font-semibold">Gear Specification</TableHead>
              <TableHead className="font-semibold hidden md:table-cell">Category</TableHead>
              <TableHead className="font-semibold text-center">Daily Rate</TableHead>
              <TableHead className="font-semibold text-center">Stock</TableHead>
              <TableHead className="font-semibold text-center">Status</TableHead>
              <TableHead className="text-right font-semibold pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gears.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                  No matching gear equipment found in inventory.
                </TableCell>
              </TableRow>
            ) : (
              gears.map((gear) => (
                <TableRow key={gear.id} className="hover:bg-muted/30 transition-colors group">

                  {/* Equipment Photo */}
                  <TableCell className="pl-4">
                    <div className="h-14 w-14 rounded-lg overflow-hidden border bg-muted shadow-inner relative">
                      {gear.images?.[0] ? (
                        <img
                          src={gear.images[0]}
                          alt={gear.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground">
                          No Photo
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Specification (Title + Brand) */}
                  <TableCell>
                    <div className="flex flex-col max-w-[260px] sm:max-w-xs">
                      <span className="font-semibold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {gear.title}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium mt-0.5">
                        {gear.brand || "Generic Brand"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Category Tag */}
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary" className="px-2.5 py-0.5 rounded-md font-medium text-xs">
                      {gear.category?.name}
                    </Badge>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="text-center font-bold text-foreground">
                    <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400">
                      ${gear.pricePerDay}
                    </span>
                  </TableCell>

                  {/* Stock Quantity */}
                  <TableCell className="text-center font-semibold">
                    <span className={gear.stock === 0 ? "text-destructive" : gear.stock < 3 ? "text-amber-500" : "text-muted-foreground"}>
                      {gear.stock} Left
                    </span>
                  </TableCell>

                  {/* Available Status */}
                  <TableCell className="text-center">
                    {gear.status && gear.stock > 0 ? (
                      <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 shadow-none rounded-full">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10 border border-destructive/20 px-2 py-0.5 shadow-none rounded-full">
                        Disabled
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button type="button" size={'icon'} onClick={() => {
                      setIsSelected(gear);
                      setIsOpen(true)
                    }}>
                      <Edit2 />
                    </Button>

                    <Button onClick={() => handleDelete(gear?.id)} type="button" variant={'destructive'} size={'icon'}>
                      <Trash2 />
                    </Button>

                  </TableCell>

                </TableRow>
              )))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


