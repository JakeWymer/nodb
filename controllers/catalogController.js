let catalogs = [];
let id = 0;

module.exports = {
  create: (req, res) => {
    let name = req.body;
    catalogs.push({id, name: req.body.name, businesses: []});
    id += 1;
    res.send(catalogs);
  },
  read: (req, res) => {
    res.send(catalogs);
  },
  add: (req, res) => {
    let cat = catalogs.find(e => e.id == req.params.id);
    cat.businesses.push(req.body.business);
    res.send(catalogs);
  },
  delete: (req, res) => {
    let index = catalogs.findIndex(e => e.id == req.params.id);
    catalogs.splice(index, 1);
    res.send(catalogs);
  },
  rename: (req, res) => {
    let cat = catalogs.find(e => e.id == req.params.id);
    cat.name = req.body.name;
    res.send(catalogs);
  },
  deleteBus: (req, res) => {
    let cat = catalogs.find(e => e.id == req.params.catalogId);
    let busIndex = cat.businesses.findIndex(e => e.id == req.params.businessId);
    cat.businesses.splice(busIndex, 1);
    res.send(catalogs);
  }
}