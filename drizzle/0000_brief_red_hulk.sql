CREATE TABLE `Items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image` text NOT NULL,
	`category` text NOT NULL,
	`subCategory` text,
	`itemType` text NOT NULL,
	`color` text,
	`season` text,
	`occasion` text,
	`fit` text,
	`brand` text,
	`itemSize` text,
	`description` text,
	CONSTRAINT "category_check" CHECK(category IN ('Clothes', 'Shoes', 'Accessories')),
	CONSTRAINT "subCategory_check" CHECK(subCategory IN ('Top over', 'Top under', 'Bottom', 'Full body', 'Outerwear')),
	CONSTRAINT "itemType_check" CHECK(itemType IN ('Broek', 'Jeans', 'Short', 'Jumpsuit', 'Jurk', 'Skirt', 'Longsleeve', 'T-shirt', 'Top', 'Polo', 'Hoodie', 'Sweater', 'Cardigan', 'Knitwear', 'Blazer', 'Jacket', 'Coat', 'Sneakers', 'Boots', 'Ankle Boots', 'Slippers', 'Sandals', 'Pumps', 'Flats', 'Heels', 'Espadrilles', 'Loafers', 'Mules', 'Ballerinas', 'Slip-ons', 'Earrings', 'Necklace', 'Bracelet', 'Ring', 'Hat', 'Cap', 'Berat', 'Beanie', 'Scarf', 'Gloves', 'Belt', 'Glasses', 'Sunglasses', 'Watch', 'Hair accessory')),
	CONSTRAINT "color_check" CHECK(color IN ('White', 'Black', 'Dark grey', 'Light grey', 'Dark blue', 'Blue', 'Light blue', 'Petrol', 'Olive', 'Dark green', 'Green', 'Lemon green', 'Dark brown', 'Light brown', 'Cream', 'Beige', 'Camel', 'Cognac', 'Mustard', 'Yellow', 'Light yellow', 'Red', 'Wine Red', 'Purple', 'Lilac', 'Fuchsia', 'Orange', 'Coral', 'Pink', 'Old pink', 'Powder pink', 'Multicolor', 'Silver', 'Gold')),
	CONSTRAINT "season_check" CHECK(season IN ('All seasons', 'Spring', 'Summer', 'Autumn', 'Winter')),
	CONSTRAINT "occasion_check" CHECK(occasion IN ('Casual', 'Sports', 'Party', 'Work', 'Travel', 'Beach', 'Festival', 'Marriage', 'Date')),
	CONSTRAINT "itemSize_check" CHECK(itemSize IN ('XS', 'S', 'M', 'L', 'XL', 'XXL', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58', 'US 1', 'US 2', 'US 4', 'US 6', 'US 8', 'US 10', 'US 12', 'US 14', 'US 16', 'US 18', 'US 20', 'US 22', 'UK 4', 'UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'UK 20', 'UK 22', 'UK 24', 'UK 26', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '24/30', '24/32', '24/34', '25/30', '25/32', '25/34', '26/30', '26/32', '26/34', '27/30', '27/32', '27/34', '28/30', '28/32', '28/34', '29/30', '29/32', '29/34', '30/30', '30/32', '30/34', '31/30', '31/32', '31/34', '32/30', '32/32', '32/34', '33/30', '33/32', '33/34', '34/30', '34/32', '34/34', 'ONE SIZE', '35', '35.5', '36.5', '37', '37.5', '38.5', '39', '39.5', '40.5', '41', '41.5', '42.5', '43', '43.5', '44.5', '45', '45.5', '47', '47.5', '48.5', '49', 'US 2.5', 'US 3', 'US 3.5', 'US 4.5', 'US 5', 'US 5.5', 'US 6.5', 'US 7', 'US 7.5', 'US 8.5', 'US 9', 'US 9.5', 'US 10.5', 'US 11', 'US 11.5', 'US 12.5', 'US 13', 'US 13.5', 'US 14.5', 'US 15', 'US 15.5', 'UK 2', 'UK 2.5', 'UK 3', 'UK 3.5', 'UK 4.5', 'UK 5', 'UK 5.5', 'UK 6.5', 'UK 7', 'UK 7.5', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10.5', 'UK 11', 'UK 11.5', 'UK 12.5', 'UK 13', 'UK 13.5', 'UK 14.5', 'UK 15', 'UK 15.5')),
	CONSTRAINT "fit_check" CHECK(fit IN ('Cropped', 'Slim fit', 'Regular fit', 'Relaxed fit', 'Baggy'))
);
--> statement-breakpoint
CREATE TABLE `OutfitItems` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`outfitId` integer NOT NULL,
	`itemId` integer NOT NULL,
	FOREIGN KEY (`outfitId`) REFERENCES `Outfits`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`itemId`) REFERENCES `Items`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `Outfits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text
);
