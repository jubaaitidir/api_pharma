const app=require('../app');
const request= require('supertest');
const medicineModel=require('../schemas/medicine');


describe("Je test les endpoints de base",()=>{
    test("should return 200 for the endpoint (/)", async ()=>{
        const res = await request(app).get("/")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("<h1>Bienvenue dans pharma api</h1>")
        expect(res.headers["content-type"]).toBe("text/html")
    })

    test("should return 200 for the endpoint (/index.html)", async ()=>{
        const res = await request(app).get("/index.html")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("<h1>Bienvenue dans pharma api</h1>")
        expect(res.headers["content-type"]).toBe("text/html")
    })

})



describe("Test endpoint (/medicine/:id)", ()=>{
    it("should return page d'accueil for param id missing",async ()=>{
        const res = await request(app).get("/medicine/")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBeDefined();
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    it("should return 200 and id in return",async ()=>{
        const res = await request(app).get("/medicine/30/")
        expect(res.statusCode).toBe(200)
        expect(res.body.id_med).toEqual(30)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    it("should return 200 and id in return",async ()=>{
        const res = await request(app).delete("/medicine/30/")
        expect(res.statusCode).toBe(200)
        expect(res.body.number_of_delete).toEqual(1)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })
})


describe("Test endpoint (/category/:id)", ()=>{
    it("should return page d'accueil for param numPage missing",async ()=>{
        const res = await request(app).get("/category/")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBeDefined();
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    it("should return 200 and id in return",async ()=>{
        const res = await request(app).get("/category/30/")
        expect(res.statusCode).toBe(200)
        expect(res.body.id_cat).toEqual(30)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    it("should return 200 and id in return",async ()=>{
        const res = await request(app).delete("/category/30/")
        expect(res.statusCode).toBe(200)
        expect(res.body.number_of_delete).toEqual(1)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })
})

