export default [
    {
      url: "/api/bar",
      method: "get",
      response: () => {
        return {
          code: 200,
          message: "ok",
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        };
      }
    }
  ];