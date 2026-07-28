import { apiUrl } from '@/config/accessEnv'
import { ICategory } from '@/types/categoriy.type';

const Categories = async () => {

  const res = await fetch(`${apiUrl}/categories`);
  const data = await res.json();

  const categories: ICategory[] = data.data.categories || [];




  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Browse by Category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.name}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="text-left">
                <p className="font-semibold group-hover:text-primary">{category.name}</p>
                <p className="text-xs text-muted-foreground">0 items</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories