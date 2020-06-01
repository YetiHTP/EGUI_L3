using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;
using System.ComponentModel.DataAnnotations.Schema;
using EGUI_L3.Models;

namespace EGUI_L3.Controllers
{
    public class EventsAccess
    {
        private static readonly string filename = "data.json";
        private static Dictionary<DateTime, List<EventModel>> database;

        public static void ReadEvents()
        {
            if (File.Exists(filename))
            {
                var json = File.ReadAllText(filename);
                database = JsonConvert.DeserializeObject<Dictionary<DateTime, List<EventModel>>>(json);
            }
        }

        public static void SaveEvents()
        {
            var json = JsonConvert.SerializeObject(database);
            File.WriteAllText(filename, json);
        }

        public static EventModel[] GetEvents(DateTime date)
        {
            create_day_if_not_exist(date);
            return database[date.Date].ToArray();
        }
        public static EventModel GetEvent(DateTime date, Guid id)
        {
            create_day_if_not_exist(date);
            foreach (var e in database[date.Date])
            {
                if (e.id == id)
                {
                    return e;
                }
            }
            return null;
        }

        public static void AddEvent(DateTime date, string desc)
        {
            create_day_if_not_exist(date);
            var new_event = new EventModel
            {
                time = date,
                desc = desc,
                id = Guid.NewGuid()
            };
            database[date.Date].Add(new_event);
            database[date.Date] = database[date.Date].OrderBy(e => e.time).ToList();

            SaveEvents();
        }
        public static void EditEvent(DateTime date, string desc, Guid id)
        {
            create_day_if_not_exist(date);
            var ev = database[date.Date].Find(e => e.id == id);
            if (ev != null)
            {
                ev.time = date;
                ev.desc = desc;
            }
            SaveEvents();
        }

        public static void DeleteEvent(DateTime date, Guid id)
        {
            create_day_if_not_exist(date);
            var ev = database[date.Date].FirstOrDefault(e => e.id == id);
            if (ev != null)
            {
                database[date.Date].Remove(ev);
            }
            if (!database[date.Date].Any())
            {
                database.Remove(date.Date);
            }
            SaveEvents();
        }

        static void create_day_if_not_exist(DateTime date)
        {
            if (database == null)
            {
                database = new Dictionary<DateTime, List<EventModel>>();
            }
            if (!database.ContainsKey(date.Date))
            {
                database.Add(date.Date, new List<EventModel>());
            }
        }

        public static int[] get_highlights(DateTime date)
        {
            List<int> t = new List<int>();
            foreach (var key in database)
            {
                if (key.Key.Year == date.Year && key.Key.Month == date.Month)
                {
                    t.Add(key.Key.Day);
                }
            }
            return t.ToArray();
        }
    }
}
