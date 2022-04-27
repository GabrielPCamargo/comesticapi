class HomeController {
  async index(req, res) {
    res.json({ msg: 'Hello World' });
  }
}

export default new HomeController();
