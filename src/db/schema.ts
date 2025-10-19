import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  published: boolean("published").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
});

export const postCategories = pgTable("post_categories", {
  id: serial("id").primaryKey(),
  post_id: integer("post_id")
    .references(() => posts.id)
    .notNull(),
  categories_id: integer("categories_id")
    .references(() => categories.id)
    .notNull(),
});
