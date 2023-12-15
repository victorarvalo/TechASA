using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTecha.OrdersDB
{
    public class OrderDL
    {
        public List<Models.Order> GetOrders()
        {
            try
            {
                using(Models.TechaDbContext db = new Models.TechaDbContext())
                {
                    return db.Orders.ToList();
                }
            }catch(Exception ex)
            {
                return null;
            }
        }
    }
}
