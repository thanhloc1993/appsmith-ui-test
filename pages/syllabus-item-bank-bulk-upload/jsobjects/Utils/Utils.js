export default {
	isJPTranslation: () => appsmith.URL.queryParams['lang'] === 'ja',
	isImportFailure: () => appsmith.store.isImportFailure,
}