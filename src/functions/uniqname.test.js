import { validUniqname } from "./uniqname";

describe(validUniqname, () => {
    it("return false if uniqname is too short", () => {
        const res = validUniqname('');
        expect(res).toEqual(false);
    });

    it("return false if uniqname is too long", () => {
        const res = validUniqname('abcdewxyz');
        expect(res).toEqual(false);
    });

    it("return false if uniqname contains spaces", () => {
        const res = validUniqname('tes t');
        expect(res).toEqual(false);
    });

    it("return false if uniqname contains numbers", () => {
        const res = validUniqname('test1');
        expect(res).toEqual(false);
    });

    it("valid uniqname", () => {
        const res = validUniqname('test');
        expect(res).toEqual(true);
    });

    it("return false if uniqname is null", () => {
        const res = validUniqname(null);
        expect(res).toEqual(false);
    });

    it("edge case", () => {
        const res = validUniqname('test1');
        expect(res).toEqual(false);
    });
});