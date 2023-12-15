using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderBusiness = BusinessTecha.OrderBusiness;
using ModelBusiness = BusinessTecha.Models;

namespace TechASAApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;

        public OrderController(ILogger<OrderController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<ModelBusiness.Order> Get()
        {
            OrderBusiness.OrderBL orderBL = new OrderBusiness.OrderBL();
            List<ModelBusiness.Order> orders = orderBL.GetOrders();
            return orders;
        }
    }
}
