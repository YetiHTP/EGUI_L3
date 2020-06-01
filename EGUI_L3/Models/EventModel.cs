using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGUI_L3.Models
{
    public class EventModel
    {
        public Guid id { get; set; }
        public DateTime time { get; set; }
        public string desc { get; set; }
    }
}
