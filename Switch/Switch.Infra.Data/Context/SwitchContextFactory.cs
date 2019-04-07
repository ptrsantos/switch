//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Design;
//using System;
//using System.Collections.Generic;
//using System.Text;

//namespace Switch.Infra.Data.Context
//{
//    public class SwitchContextFactory : IDesignTimeDbContextFactory<SwitchContext>
//    {
//        public SwitchContext CreateDbContext(string[] args)
//        {
//            var optionsBuilder = new DbContextOptionsBuilder<SwitchContext>();
//            optionsBuilder.UseMySql("SwitchDB");

//            return new SwitchContext(optionsBuilder.Options);
//        }
//    }
//}
