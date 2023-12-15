using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTecha.ProductsDB
{
    public class ProductDL
    {
        public List<Models.Product> GetProducts()
        {
            try
            {
                using(Models.TechaDbContext db = new Models.TechaDbContext())
                {
                    return db.Products.ToList();
                }
            }catch (Exception ex)
            {
                return null;
            }
        }
    }
}
