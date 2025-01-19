using Common.Models;
using Data_Access_Layer_ASP.NET_Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class Data_Access_Layer_ASPNET_CoreContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
{
    public Data_Access_Layer_ASPNET_CoreContext(DbContextOptions<Data_Access_Layer_ASPNET_CoreContext> options)
        : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; } = default!;
    public DbSet<Book> Books { get; set; } = default!;
    public DbSet<BookCategory> BookCategories { get; set; } = default!;
    public DbSet<Order> Orders { get; set; } = default!;
    public DbSet<OrderItem> OrderItems { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Define composite key for BookCategory (Many-to-Many relationship between Book and Category)
        modelBuilder.Entity<BookCategory>()
            .HasKey(bc => new { bc.BookId, bc.CategoryId });

        modelBuilder.Entity<BookCategory>()
            .HasOne(bc => bc.Book)
            .WithMany(b => b.BookCategories)
            .HasForeignKey(bc => bc.BookId);

        modelBuilder.Entity<BookCategory>()
            .HasOne(bc => bc.Category)
            .WithMany(c => c.BookCategories)
            .HasForeignKey(bc => bc.CategoryId);






        modelBuilder.Entity<AppUser>()
        .HasIndex(u => u.Email)
        .IsUnique(true); // Ensure the email is unique in the database






        // Seed data for Categories
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "History" },
            new Category { Id = 2, Name = "Sci-Fi" },
            new Category { Id = 3, Name = "Fantasy" },
            new Category { Id = 4, Name = "Biography" },
            new Category { Id = 5, Name = "Technology" },
            new Category { Id = 6, Name = "Thriller" },
            new Category { Id = 7, Name = "Adventure" },
            new Category { Id = 8, Name = "Philosophy" },
            new Category { Id = 9, Name = "Psychology" },
            new Category { Id = 10, Name = "Self-Help" }
        );

        // Seed data for Books
        modelBuilder.Entity<Book>().HasData(
       new Book
       {
           Id = 1,
           Title = "The Lord of the Rings: The Fellowship of the Ring",
           Description = "The first volume in J.R.R. Tolkien's epic fantasy trilogy...",
           Language = "English",
           ImageUrl = "https://covers.openlibrary.org/b/id/8226191-L.jpg",
           Price = 40.9M,
           Author = "J.R.R. Tolkien",
           Publisher = "Allen & Unwin",
           PublicationDate = new DateTime(1954, 7, 29)
       },
            new Book
            {
                Id = 2,
                Title = "Sapiens: A Brief History of Humankind",
                Description = "An exploration of the history of humankind...",
                Language = "English",
                ImageUrl = "https://covers.openlibrary.org/b/id/8311456-L.jpg",
                Price = 20.0M,
                Author = "Yuval Noah Harari",
                Publisher = "Harvill Secker",
                PublicationDate = new DateTime(2011, 2, 4)
            },
            new Book
            {
                Id = 3,
                Title = "Steve Jobs",
                Description = "A biography of Steve Jobs by Walter Isaacson...",
                Language = "English",
                ImageUrl = "https://covers.openlibrary.org/b/id/10410247-L.jpg",
                Price = 25.0M,
                Author = "Walter Isaacson",
                Publisher = "Simon & Schuster",
                PublicationDate = new DateTime(2011, 10, 24)
            },
            new Book
            {
                Id = 4,
                Title = "Clean Code",
                Description = "A handbook of agile software craftsmanship by Robert C. Martin...",
                Language = "English",
                ImageUrl = "https://covers.openlibrary.org/b/id/8374689-L.jpg",
                Price = 35.0M,
                Author = "Robert C. Martin",
                Publisher = "Prentice Hall",
                PublicationDate = new DateTime(2008, 8, 1)
            },
            new Book
            {
                Id = 5,
                Title = "The Silent Patient",
                Description = "A gripping psychological thriller by Alex Michaelides...",
                Language = "English",
                ImageUrl = "https://covers.openlibrary.org/b/id/8375450-L.jpg",
                Price = 15.0M,
                Author = "Alex Michaelides",
                Publisher = "Celadon Books",
                PublicationDate = new DateTime(2019, 2, 5)
            },
            new Book
            {
                Id = 6,
                Title = "1984",
                Description = "A dystopian social science fiction novel by George Orwell...",
                Language = "English",
                ImageUrl = "https://covers.openlibrary.org/b/id/8228671-L.jpg",
                Price = 18.0M,
                Author = "George Orwell",
                Publisher = "Secker & Warburg",
                PublicationDate = new DateTime(1949, 6, 8)
            },
            new Book
            {
                Id = 7,
                Title = "Meditations",
                Description = "A series of personal writings by Marcus Aurelius on Stoic philosophy...",
                Language = "English",
                ImageUrl = "https://covers.openlibrary.org/b/id/8226111-L.jpg",
                Price = 10.0M,
                Author = "Marcus Aurelius",
                Publisher = "Ecco",
                PublicationDate = new DateTime(180, 1, 1)
            },
            new Book
            {
                Id = 8,
                Title = "Thinking, Fast and Slow",
                Description = "A book by Daniel Kahneman on psychology and decision-making...",
                Language = "English",
                ImageUrl = "https://covers.openlibrary.org/b/id/8375447-L.jpg",
                Price = 22.0M,
                Author = "Daniel Kahneman",
                Publisher = "Farrar, Straus and Giroux",
                PublicationDate = new DateTime(2011, 10, 25)
            }
        );

        // Seed data for BookCategory (many-to-many relationships)
        modelBuilder.Entity<BookCategory>().HasData(
            new BookCategory { BookId = 1, CategoryId = 3 }, // Fantasy
            new BookCategory { BookId = 1, CategoryId = 7 }, // Adventure
            new BookCategory { BookId = 2, CategoryId = 1 }, // History
            new BookCategory { BookId = 2, CategoryId = 8 }, // Philosophy
            new BookCategory { BookId = 3, CategoryId = 4 }, // Biography
            new BookCategory { BookId = 3, CategoryId = 5 }, // Technology
            new BookCategory { BookId = 4, CategoryId = 5 }, // Technology
            new BookCategory { BookId = 4, CategoryId = 10 }, // Self-Help
            new BookCategory { BookId = 5, CategoryId = 6 }, // Thriller
            new BookCategory { BookId = 5, CategoryId = 9 }, // Psychology
            new BookCategory { BookId = 6, CategoryId = 2 }, // Sci-Fi
            new BookCategory { BookId = 6, CategoryId = 8 }, // Philosophy
            new BookCategory { BookId = 7, CategoryId = 8 }, // Philosophy
            new BookCategory { BookId = 7, CategoryId = 10 }, // Self-Help
            new BookCategory { BookId = 8, CategoryId = 9 }, // Psychology
            new BookCategory { BookId = 8, CategoryId = 10 } // Self-Help
        );

        // Seed data for Identity Roles
        modelBuilder.Entity<IdentityRole<int>>().HasData(
            new IdentityRole<int>
            {
                Id = 1,
                Name = "Admin",
                NormalizedName = "ADMIN",
                ConcurrencyStamp = Guid.NewGuid().ToString()
            },
              new IdentityRole<int>
              {
                  Id = 2,
                  Name = "User",
                  NormalizedName = "USER",
                  ConcurrencyStamp = Guid.NewGuid().ToString()
              }
        );

        // Seed data for AppUser
        var hasher = new PasswordHasher<AppUser>();
        modelBuilder.Entity<AppUser>().HasData(
            new AppUser
            {
                Id = 1,
                Email = "Admin333@gmail.com",
                NormalizedEmail = "ADMIN333@GMAIL.COM",
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Admin333@",
                NormalizedUserName = "ADMIN333@",
                PasswordHash = hasher.HashPassword(null, "Admin333@gmail.com")
            }
        );

        // Seed data for UserRole mapping
        modelBuilder.Entity<IdentityUserRole<int>>().HasData(
            new IdentityUserRole<int>
            {
                RoleId = 1,
                UserId = 1
            }
        );

        // Seed data for Orders and OrderItems
        modelBuilder.Entity<Order>().HasData(
            new Order
            {
                OrderId = 1,
                UserId = 1,  // User: godmars20
                OrderDate = DateTime.UtcNow,
                TotalAmount = 95.9M
            },
            new Order
            {
                OrderId = 2,
                UserId = 1,  // User: godmars20
                OrderDate = DateTime.UtcNow.AddDays(-1),
                TotalAmount = 75.0M
            }
        );

        modelBuilder.Entity<OrderItem>().HasData(
            // Order 1 Items
            new OrderItem
            {
                OrderItemId = 1,
                OrderId = 1,
                BookId = 1,  // Book: The Lord of the Rings
                Quantity = 1,
                PriceAtTimeOfPurchase = 40.9M
            },
            new OrderItem
            {
                OrderItemId = 2,
                OrderId = 1,
                BookId = 2,  // Book: Sapiens
                Quantity = 1,
                PriceAtTimeOfPurchase = 20.0M
            },

            // Order 2 Items
            new OrderItem
            {
                OrderItemId = 3,
                OrderId = 2,
                BookId = 4,  // Book: Clean Code
                Quantity = 1,
                PriceAtTimeOfPurchase = 35.0M
            },
            new OrderItem
            {
                OrderItemId = 4,
                OrderId = 2,
                BookId = 5,  // Book: The Silent Patient
                Quantity = 1,
                PriceAtTimeOfPurchase = 15.0M
            }
        );



        // Configuring the relationship between AppUser and Order entities
        modelBuilder.Entity<AppUser>()
            // Specifies that AppUser has a one-to-many relationship with the Order entity.
            // This means each user can have multiple orders, but each order is associated with only one user.
            .HasMany(u => u.Orders)

            // Defines the inverse navigation property.
            // The Order entity has a reference back to the AppUser through the 'User' property.
            .WithOne(o => o.User)

            // Specifies the foreign key in the Order table that links to the primary key in the AppUser table.
            // In this case, the 'UserId' property in the Order table acts as the foreign key.
            .HasForeignKey(o => o.UserId)

            // Configures the cascading delete behavior for this relationship.
            // When a user is deleted, all related orders will also be deleted automatically.
            // This ensures referential integrity in the database by preventing orphaned records in the Order table.
            .OnDelete(DeleteBehavior.Cascade);



        // Configure the `UserRole` entity in the model using Fluent API
        modelBuilder.Entity<UserRole>(entity =>
        {
            // Define a composite primary key for the `UserRole` entity
            // A composite key means that both `UserId` and `RoleId` together uniquely identify a record in this table
            // This is typically used for many-to-many relationships, where a single field isn't enough to uniquely identify a record
            entity.HasKey(ur => new { ur.UserId, ur.RoleId });
        });

        // Configure the relationship between `UserRole` and `User` entities
        modelBuilder.Entity<UserRole>()
            // Indicate that the `UserRole` entity has a reference to a single `User`
            .HasOne(ur => ur.User)
            // Define the reverse navigation: a single `User` can have many associated `UserRole` entries
            .WithMany(u => u.UserRoles)
            // Set `UserId` in the `UserRole` entity as the foreign key that links to the primary key in the `User` entity
            .HasForeignKey(ur => ur.UserId);

        // Configure the relationship between `UserRole` and `Role` entities
        modelBuilder.Entity<UserRole>()
            // Indicate that the `UserRole` entity has a reference to a single `Role`
            .HasOne(ur => ur.Role)
            // Define the reverse navigation: a single `Role` can have many associated `UserRole` entries
            .WithMany(r => r.UserRoles)
            // Set `RoleId` in the `UserRole` entity as the foreign key that links to the primary key in the `Role` entity
            .HasForeignKey(ur => ur.RoleId);




    }
}
