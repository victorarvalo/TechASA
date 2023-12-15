using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace BusinessTecha.OrderBusiness
{
    public class OrderBL
    {
        public List<Models.Order> GetOrders()
        {
            DataTecha.OrdersDB.OrderDL orderDL = new DataTecha.OrdersDB.OrderDL();
            var orders = orderDL.GetOrders();
            var config = new MapperConfiguration(cfg => cfg.CreateMap<DataTecha.Models.Order, Models.Order>());
            var mapper = config.CreateMapper();
            return mapper.Map<List<Models.Order>>(orders);
        }
    }
}
