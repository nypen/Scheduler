using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using SchedulerApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Repositories
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        protected readonly CompanyContext _context;

        public Repository(CompanyContext context)
        {
            _context = context;
        }
        protected async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        protected async Task Save()
        {
           await _context.SaveChangesAsync();
        }

        public async Task<T> Create(T entity)
        {
            _context.Add(entity);
            await SaveAsync();

            return entity;
        }

        public async Task Delete(T entity)
        {
            _context.Remove(entity);
            await SaveAsync();
        }

        public async Task<IEnumerable<T>> Find(Func<T, bool> predicate,bool eager=false)
        {
            var all = _context.Set<T>().AsNoTracking().AsQueryable();

            if (eager)
            {
                foreach (var property in _context.Model.FindEntityType(typeof(T)).GetNavigations())
                    all = all.Include(property.Name);
            }

            return await all.Where(predicate).AsQueryable().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAll(bool eager=false)
        {
            var all = _context.Set<T>().AsNoTracking().AsQueryable();

            if (eager)
            {
                foreach (var property in _context.Model.FindEntityType(typeof(T)).GetNavigations())
                    all = all.Include(property.Name);
            }
            
            return await all.ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T> Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await SaveAsync();

            return entity;
        }
    }
}
