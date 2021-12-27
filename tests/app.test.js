const app = require('../app');
const request = require('supertest');
const medicineModel = require('../schemas/medicine');
const categorieModel= require('../schemas/category')

describe("Je test les endpoints de base", () => {
    test("should return 200 for the endpoint (/)", async () => {
        const res = await request(app).get("/")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("<h1>Bienvenue dans pharma api</h1>")
        expect(res.headers["content-type"]).toBe("text/html")
    })

    test("should return 200 for the endpoint (/index.html)", async () => {
        const res = await request(app).get("/index.html")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("<h1>Bienvenue dans pharma api</h1>")
        expect(res.headers["content-type"]).toBe("text/html")
    })

})


describe("test medicines endpoints", () => {

    it("should create medicine in database", async () => {
        const myForm = {
            id_med: 30,
            title: "PARACETAMOL BIOGARAN 500 mg, comprimé effervescent",
            cat: "61c8ecbc9080494b7474fdf9",
            authorization_holder: " BIOGARAN ",
            cis_code: "6 017 004 6"
        }

        const res = await request(app).post("/medicine").send(myForm)
        expect(res.statusCode).toBe(201)
        expect(res.body).not.toBeUndefined()
        expect(res.body.id_med).not.toBeUndefined()
        let id_med = res.body.id_med;

        const medicine = await medicineModel.findOne({ id_med: id_med });
        expect(medicine.title).toEqual("PARACETAMOL BIOGARAN 500 mg, comprimé effervescent");
        //expect(medicine.cat).toEqual("61c8ecbc9080494b7474fdf9");
        expect(medicine.authorization_holder).toEqual(" BIOGARAN ");
        expect(medicine.cis_code).toEqual("6 017 004 6");

        //await medicineModel.deleteMany({id_med:30})
    })

    it("should update medicine in database", async () => {
        const myForm = {
            id_med: 30,
            title: "PARACETAMOL BIOGARAN 500 mg, comprimé effervescent 2",
            cat: "61c8ecbc9080494b7474fdf9",
            authorization_holder: " BIOGARAN 2 ",
            cis_code: "6 017 004 2"
        }

        const res = await request(app).put("/medicine").send(myForm)
        expect(res.statusCode).toBe(201)
        expect(res.body).not.toBeUndefined()
        expect(res.body.acknowledged).toEqual(true)
        expect(res.body.modifiedCount).toEqual(1)



        const medicine = await medicineModel.findOne({ id_med: 30 });
        expect(medicine.title).toEqual("PARACETAMOL BIOGARAN 500 mg, comprimé effervescent 2");
        //expect(medicine.cat).toEqual("61c8ecbc9080494b7474fdf9");
        expect(medicine.authorization_holder).toEqual(" BIOGARAN 2 ");
        expect(medicine.cis_code).toEqual("6 017 004 2");

        //await medicineModel.deleteMany({id_med:30})
    })
})



describe("test categories endpoints", () => {

    it("should create category in database", async () => {
        const myForm = {
            id_cat: 50,
            nom: "Concérologie",
            cis_code: "1 666 666 1",
        }

        const res = await request(app).post("/category").send(myForm)
        expect(res.statusCode).toBe(201)
        expect(res.body).not.toBeUndefined()
        expect(res.body.id_cat).not.toBeUndefined()
        let id_cat = res.body.id_cat;

        const category = await categorieModel.findOne({ id_cat: id_cat });
        expect(category.nom).toEqual("Concérologie");
   
        expect(category.cis_code).toEqual("1 666 666 1");

        //await medicineModel.deleteMany({id_med:30})
    })

    it("should update category in database", async () => {
        const myForm = {
            id_cat: 50,
            nom: "Concérologie 2",
            cis_code: "1 666 666 2",
        }

        const res = await request(app).put("/category").send(myForm)
        expect(res.statusCode).toBe(201)
        expect(res.body).not.toBeUndefined()
        expect(res.body.acknowledged).toEqual(true)
        expect(res.body.modifiedCount).toEqual(1)
        let id_cat = myForm.id_cat;
        

        const category = await categorieModel.findOne({ id_cat: id_cat });
        expect(category.nom).toEqual("Concérologie 2");
        expect(category.cis_code).toEqual("1 666 666 2");
    })
})


describe("Test endpoint (/medicine/:id)", () => {
    it("should return all medicines for param id missing", async () => {
        const res = await request(app).get("/medicine/")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBeDefined();
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    it("should return 200 and id in return", async () => {
        const res = await request(app).get("/medicine/30/")
        expect(res.statusCode).toBe(200)
        expect(res.body.id_med).toEqual(30)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    it("should return 200 and id in return", async () => {
        const res = await request(app).delete("/medicine/30/")
        expect(res.statusCode).toBe(200)
        expect(res.body.number_of_delete).toEqual(1)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })
})


describe("Test endpoint (/category/:id)", () => {
    it("should return all categories for param id missing", async () => {
        const res = await request(app).get("/category/")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBeDefined();
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    it("should return 200 and id in return", async () => {
        const res = await request(app).get("/category/50/")
        expect(res.statusCode).toBe(200)
        expect(res.body.id_cat).toEqual(50)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    it("should return 200 and id in return", async () => {
        const res = await request(app).delete("/category/50/")
        expect(res.statusCode).toBe(200)
        expect(res.body.number_of_delete).toEqual(1)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })
})




