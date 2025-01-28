import Card from "../pages/Card";


export default function Products() {


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
   <Card />
      </div>
    </div>
  );
}
