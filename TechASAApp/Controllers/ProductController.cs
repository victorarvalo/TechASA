using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ModelBusiness = BusinessTecha.Models;
using ProductBusiness = BusinessTecha.ProductBusiness;

namespace TechASAApp.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;

        public ProductController(ILogger<ProductController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<ModelBusiness.Product> GetProducts()
        {
            ProductBusiness.ProductBL productBL = new ProductBusiness.ProductBL();
            List<ModelBusiness.Product> products = productBL.GetProducts();
            return products;
        }
    }
}
