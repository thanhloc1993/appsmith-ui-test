export default {
  getAcademicYearOptions: () => {
    const result = ArchGetAcademicYears.data;
    if (result && result.data && result.data.academic_year && result.data.academic_year.length > 0) {
      return result.data.academic_year.map((item) => {
        return {
          label: item.name,
          value: item.academic_year_id,
        };
      });
    }
    return [];
  },
};
