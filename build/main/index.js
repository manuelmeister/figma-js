"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
__exportStar(require("./figmaTypes"), exports);
const axios_1 = __importDefault(require("axios"));
const HttpsProxyAgent = require("https-proxy-agent");
const Client = (opts) => {
    const headers = opts.accessToken
        ? {
            Authorization: `Bearer ${opts.accessToken}`,
        }
        : {
            'X-Figma-Token': opts.personalAccessToken,
        };
    let client;
    if (!!process.env.https_proxy) {
        client = axios_1.default.create({
            baseURL: `https://${opts.apiRoot || 'api.figma.com'}/v1/`,
            headers,
            proxy: false,
            httpsAgent: new HttpsProxyAgent(process.env.https_proxy),
        });
    }
    else {
        client = axios_1.default.create({
            baseURL: `https://${opts.apiRoot || 'api.figma.com'}/v1/`,
            headers,
        });
    }
    return {
        client,
        file: (fileId, params = {}) => client.get(`files/${fileId}`, {
            params: Object.assign(Object.assign({}, params), { ids: params.ids ? params.ids.join(',') : '' }),
        }),
        fileVersions: (fileId) => client.get(`files/${fileId}/versions`),
        fileNodes: (fileId, params) => client.get(`files/${fileId}/nodes`, {
            params: Object.assign(Object.assign({}, params), { ids: params.ids.join(',') }),
        }),
        fileImages: (fileId, params) => client.get(`images/${fileId}`, {
            params: Object.assign(Object.assign({}, params), { ids: params.ids.join(',') }),
        }),
        fileImageFills: (fileId) => client.get(`files/${fileId}/images`),
        comments: (fileId) => client.get(`files/${fileId}/comments`),
        postComment: (fileId, params) => client.post(`files/${fileId}/comments`, params),
        deleteComment: (fileId, commentId) => client.delete(`files/${fileId}/comments/${commentId}`),
        me: () => client.get(`me`),
        teamProjects: (teamId) => client.get(`teams/${teamId}/projects`),
        projectFiles: (projectId) => client.get(`projects/${projectId}/files`),
        teamComponents: (teamId, params = {}) => client.get(`teams/${teamId}/components`, { params }),
        fileComponents: (fileId) => client.get(`files/${fileId}/components`),
        component: (key) => client.get(`components/${key}`),
        teamStyles: (teamId, params = {}) => client.get(`teams/${teamId}/styles`, { params }),
        fileStyles: (fileId) => client.get(`files/${fileId}/styles`),
        style: (key) => client.get(`styles/${key}`),
    };
};
exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLCtDQUE2QjtBQUM3QixrREFBMkQ7QUFDM0QsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFrUzlDLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBbUIsRUFBbUIsRUFBRTtJQUM3RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVztRQUM5QixDQUFDLENBQUM7WUFDRSxhQUFhLEVBQUUsVUFBVSxJQUFJLENBQUMsV0FBVyxFQUFFO1NBQzVDO1FBQ0gsQ0FBQyxDQUFDO1lBQ0UsZUFBZSxFQUFFLElBQUksQ0FBQyxtQkFBbUI7U0FDMUMsQ0FBQztJQUVOLElBQUksTUFBTSxDQUFDO0lBQ1gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7UUFDN0IsTUFBTSxHQUFHLGVBQUssQ0FBQyxNQUFNLENBQUM7WUFDcEIsT0FBTyxFQUFFLFdBQVcsSUFBSSxDQUFDLE9BQU8sSUFBSSxlQUFlLE1BQU07WUFDekQsT0FBTztZQUNQLEtBQUssRUFBRSxLQUFLO1lBQ1osVUFBVSxFQUFFLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQ3pELENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxNQUFNLEdBQUcsZUFBSyxDQUFDLE1BQU0sQ0FBQztZQUNwQixPQUFPLEVBQUUsV0FBVyxJQUFJLENBQUMsT0FBTyxJQUFJLGVBQWUsTUFBTTtZQUN6RCxPQUFPO1NBQ1IsQ0FBQyxDQUFDO0tBQ0o7SUFHRCxPQUFPO1FBQ0wsTUFBTTtRQUVOLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLE1BQU0sRUFBRSxF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