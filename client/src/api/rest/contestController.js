import http from '../interceptor';

export const dataForContest = (data) => http.post('dataForContest', data);
export const getCustomersContests = (data) => http.post('getCustomersContests', {
  limit: data.limit,
  offset: data.offset,
}, {
  headers: {
    status: data.contestStatus,
  },
});
export const getContestById = (data) => http.get('getContestById', {
  headers: {
    contestId: data.contestId,
  },
});
export const getActiveContests = ({
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
}) => http.post('getAllContests', {
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
});
export const updateContest = (data) => http.patch('updateContest', data);
export const downloadContestFile = (data) => http.get(`downloadFile/${data.fileName}`);
export const setOfferStatus = (data) => http.post('setOfferStatus', data);
