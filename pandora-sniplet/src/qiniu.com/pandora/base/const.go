package base

const (
	MethodGet    string = "GET"
	MethodPost   string = "POST"
	MethodDelete string = "DELETE"
	MethodPut    string = "PUT"
)

const (
	HTTPHeaderAppId         string = "X-AppId"
	HTTPHeaderContentType   string = "Content-Type"
	HTTPHeaderContentLength string = "Content-Length"
	HTTPHeaderContentMD5    string = "Content-MD5"
	HTTPHeaderRequestId     string = "X-Reqid"
	HTTPHeaderAuthorization string = "Authorization"
)

const (
	OpCreateGroup     string = "CreateGroup"
	OpUpdateGroup     string = "UpdateGroup"
	OpStartGroupTask  string = "StartGroupTask"
	OpStopGroupTask   string = "StopGroupTask"
	OpListGroups      string = "ListGroup"
	OpGetGroup        string = "GetGroup"
	OpDeleteGroup     string = "DeleteGroup"
	OpCreateRepo      string = "CreateRepo"
	OpGetRepo         string = "GetRepo"
	OpListRepos       string = "ListRepo"
	OpDeleteRepo      string = "DeleteRepo"
	OpPostData        string = "PostData"
	OpCreateTransform string = "CreateTransform"
	OpGetTransform    string = "GetTransform"
	OpListTransforms  string = "ListTransform"
	OpDeleteTransform string = "DeleteTransform"
	OpCreateExport    string = "CreateExport"
	OpGetExport       string = "GetExport"
	OpListExports     string = "ListExport"
	OpDeleteExport    string = "DeleteExport"
	OpUploadPlugin    string = "UploadPlugin"
	OpGetPlugin       string = "GetPlugin"
	OpListPlugins     string = "ListPlugin"
	OpDeletePlugin    string = "DeletePlugin"
	OpVerifyTransform string = "VerfiyTransfom"
	OpVerifyExport    string = "VerfiyExport"

	OpUpdateRepo        string = "UpdateRepo"
	OpSendLog           string = "SendLog"
	OpQueryLog          string = "QueryLog"
	OpQueryHistogramLog string = "QueryHistogramLog"
	OpPutRepoConfig     string = "PutRepoConfig"
	OpGetRepoConfig     string = "GetRepoConfig"

	//tsdb only
	OpUpdateRepoMetadata string = "UpdataRepoMetadata"
	OpDeleteRepoMetadata string = "DeleteRepoMetadata"
	OpUpdateViewMetadata string = "UpdataViewMetadata"
	OpDeleteViewMetadata string = "DeleteViewMetadata"

	OpCreateSeries         string = "CreateSeries"
	OpUpdateSeriesMetadata string = "UpdataSeriesMetadata"
	OpDeleteSeriesMetadata string = "DeleteSeriesMetadata"
	OpListSeries           string = "ListSeries"
	OpDeleteSeries         string = "DeleteSeries"

	OpCreateView  string = "CreateView"
	OpListView    string = "ListView"
	OpGetView     string = "GetView"
	OpDeleteView  string = "DeleteView"
	OpQueryPoints string = "QueryPoints"
	OpWritePoints string = "WritePoints"
)

const (
	ContentTypeJson        string = "application/json"
	ContentTypeJar         string = "application/java-archive"
	ContentTypeText        string = "text/plain"
	ContentTypeOctetStream string = "application/octet-stream"
)
