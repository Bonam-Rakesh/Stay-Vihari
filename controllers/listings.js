const listings = [
    {
        id: 1,
        title: "Luxury Mountain Villa",
        location: "Manali, India",
        category: "mountain",
        price: 8500,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    },
    {
        id: 2,
        title: "Forest Escape Cabin",
        location: "Coorg, India",
        category: "camping",
        price: 6200,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
    },
    {
        id: 3,
        title: "Modern City Apartment",
        location: "Mumbai, India",
        category: "city",
        price: 5200,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6"
    },
    {
        id: 4,
        title: "Beachside Retreat",
        location: "Goa, India",
        category: "beach",
        price: 6800,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544986581-efac024faf62"
    },
    {
        id: 5,
        title: "Himalayan Wooden House",
        location: "Kasol, India",
        category: "mountain",
        price: 4500,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739"
    },
    {
        id: 6,
        title: "Luxury Forest Retreat",
        location: "Wayanad, India",
        category: "camping",
        price: 7200,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
    }
];



module.exports.index = (req, res) => {
    res.render("listings/index", {
        listings,
        searchTerm: null,
        activeCategory: "all"
    });
};


module.exports.search = (req, res) => {
    const searchTerm = (req.query.country || "").trim().toLowerCase();

    let filteredListings = listings;

    if (searchTerm) {
        filteredListings = listings.filter(listing =>
            listing.title.toLowerCase().includes(searchTerm) ||
            listing.location.toLowerCase().includes(searchTerm) ||
            listing.category.toLowerCase().includes(searchTerm)
        );
    }

    res.render("listings/index", {
        listings: filteredListings,
        searchTerm: req.query.country || "",
        activeCategory: "all"
    });
};


module.exports.category = (req, res) => {
    const category = req.params.category.toLowerCase();

    let filteredListings;

    if (category === "trending") {
        filteredListings = listings.filter(
            listing => listing.rating >= 4.8
        );
    } else {
        filteredListings = listings.filter(
            listing => listing.category === category
        );
    }

    res.render("listings/index", {
        listings: filteredListings,
        searchTerm: null,
        activeCategory: category
    });
};


module.exports.show = (req, res) => {
    const id = Number(req.params.id);

    const listing = listings.find(
        listing => listing.id === id
    );

    if (!listing) {
        return res.status(404).send("Listing not found");
    }

    res.render("listings/show", { listing });
};