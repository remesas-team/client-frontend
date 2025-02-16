import {handleApi} from "~/utils/handleApi";

export const operationsRepository = () => {
    const fetch = handleApi()

    return {
        postOperation(body) {
            return fetch.post('/v1/platform/operations/create', body)
        },
        getOperations(params) {
            return fetch.get('/v1/platform/operations', params)
        },
        getOperationById(id) {
            return fetch.get(`/v1/platform/operations/${id}`)
        },
        getTrackingOperationById(id) {
            return fetch.get(`/v1/platform/operations/${id}/tracking`)
        },
        getEstimate(params) {
            return fetch.get('/v1/platform/operations/estimate', params)
        },
        postUploadVoucher(body) {
            return fetch.post('/v1/platform/operations/upload-voucher', body)
        },
    }
}
