exports.index = function(req, res){
  res.render('index', { title: 'Maund Mirror and Glass' });
};
  
exports.productlist = function(db) {
	return function(req, res) {
		var collection = db.get('usercollection');
		collection.find({}, {}, function(e,docs){
			res.render('productlist', {title: 'Product List', "productlist" : docs});
		});
	};
};

exports.newproduct = function(req, res){
	res.render('newproduct', { title: 'Add New Product' });
};

exports.addproduct = function(db) {
	return function(req, res) {
		var prodName = req.body.prodname;
		var prodDetails = req.body.proddetails;
		
		var collection = db.get('usercollection');
		
		collection.insert({
			"product" : prodName,
			"details" : prodDetails
		}, function (err, doc) {
				if (err) {
					res.send("There was a problem adding the product information to the database.");
				} else {
					res.redirect("productlist");
					res.location("productlist");
				}
		});
	};
};

exports.findproduct = function(req, res){
	res.render('findproduct', { title: 'Find Product' });
};

exports.queryproduct = function(db) {
	return function(req, res) {
		var prodName = req.body.prodname;
				
		var collection = db.get('usercollection');
		
		collection.find({
			"product" : prodName
		}, function (err, doc) {
				if (err) {
					res.send("There was a problem finding the product information in the database.");
				} else {
					saveName = doc[0].product;
					res.render('productdisplay', {title: 'Product Maintenance', 
												outputdetails: doc[0].details,
												outputproduct: doc[0].product,
												outputid: doc[0]._id});
				}
		});
	};
};

exports.updateproduct = function(db) {
	return function(req, res) {
		var prodDetails = req.body.proddetails;
		
		var collection = db.get('usercollection');
		
		collection.findAndModify({
			query: {product: saveName},
			update: {details: prodDetails, product: saveName}
		});
		
		res.redirect("productlist");
		res.location("productlist");
	};
};

exports.deleteproduct = function(db) {
	return function(req, res) {
		var collection = db.get('usercollection');
		
		collection.remove({product: saveName});
		
		res.redirect("productlist");
		res.location("productlist");
	};
};
