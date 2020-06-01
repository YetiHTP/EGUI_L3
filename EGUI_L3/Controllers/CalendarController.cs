using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using EGUI_L3.Models;

namespace EGUI_L3.Controllers
{
    [ApiController]
    [Route("controller")]
    public class CalendarController : ControllerBase
    {


        [HttpGet("GetHighlights")]
        public IActionResult GetHighlights(int? year, int? month)
        {
            EventsAccess.ReadEvents();
            var date = new DateTime(year ?? DateTime.Now.Year, month ?? DateTime.Now.Month, 1);
            return Ok(EventsAccess.get_highlights(date));
        }

        [HttpGet("GetEvents")]
        public IActionResult GetEvents(int? year, int? month, int? day)
        {
            var date = new DateTime(year ?? DateTime.Now.Year, month ?? DateTime.Now.Month, day ?? DateTime.Now.Day);
            var events = EventsAccess.GetEvents(date);
            return Ok(events.OrderBy(e => e.time));
        }


        [HttpPost("Add")]
        public IActionResult Add(DateTime time, string desc, int? year, int? month, int? day)
        {
            var date = new DateTime(year ?? DateTime.Now.Year, month ?? DateTime.Now.Month, day ?? DateTime.Now.Day, time.Hour, time.Minute, time.Second);
            EventsAccess.AddEvent(date, desc);
            return Ok();
        }

        [HttpPost("Edit")]
        public IActionResult Edit(DateTime time, string desc, int? year, int? month, int? day, Guid? id)
        {
            var date = new DateTime(year ?? DateTime.Now.Year, month ?? DateTime.Now.Month, day ?? DateTime.Now.Day, time.Hour, time.Minute, time.Second);
            EventsAccess.EditEvent(date, desc, id.Value);
            return Ok();
        }

        [HttpPost("Delete")]
        public IActionResult Delete(int? year, int? month, int? day, Guid? id)
        {
            var date = new DateTime(year ?? DateTime.Now.Year, month ?? DateTime.Now.Month, day ?? DateTime.Now.Day);
            EventsAccess.DeleteEvent(date, id.Value);
            return Ok();
        }



    }
}
