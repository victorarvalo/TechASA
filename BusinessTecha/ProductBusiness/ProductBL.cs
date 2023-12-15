using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessTecha.ProductBusiness
{
    public class ProductBL
    {
        public List<Models.Product> GetProducts()
        {
            DataTecha.ProductsDB.ProductDL productDL = new DataTecha.ProductsDB.ProductDL();
            var products = productDL.GetProducts();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<DataTecha.Models.Product, Models.Product>());
            var mapper = config.CreateMapper();
            return mapper.Map<List<Models.Product>>(products);
        }
    }
}
