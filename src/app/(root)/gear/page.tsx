

import Gears from '../_components/Gears'
import Sidebars from './_components/Sidebars'
import SearchFilters from './_components/search-filters'


export default function GearListingPage() {
 

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <h1 className="text-3xl font-bold">Browse Gear</h1>
          <p className="mt-2 text-muted-foreground">
            Find and rent 4 piece of equipment
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Filters */}
         <Sidebars />

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
           <SearchFilters />

         

            <Gears className={''} />

           
          </div>
        </div>
      </div>
    </div>
  )
}
