# 🛡️ AgentShield — Dify Plugins Security Report

> Automated security scan of the [langgenius/dify-plugins](https://github.com/langgenius/dify-plugins) repository.

**Scanned**: 493 plugins | 11833 files | 1,556,184 lines
**Duration**: 124.7s
**Average Score**: 74/100
**Scanner**: [AgentShield](https://github.com/elliotllliu/agentshield) v0.3.0
**Date**: 2026-03-13

## Summary

| Category | Count | % |
|----------|-------|---|
| 🔴 Plugins with High Risk findings | 199 | 40.4% |
| 🟡 Plugins with Medium Risk only | 54 | 11.0% |
| 🟢 Clean plugins (Low/None) | 240 | 48.7% |

**Total findings**: 4371 (🔴 575 high, 🟡 2745 medium, 🟢 1051 low)

## Score Distribution

| Score Range | Count |
|-------------|-------|
| 90-100 (Low Risk) | 247 |
| 70-89 (Moderate Risk) | 105 |
| 40-69 (High Risk) | 68 |
| 0-39 (Critical Risk) | 73 |

## 🔴 High Risk Plugins

| Plugin | Score | 🔴 High | 🟡 Med | 🟢 Low | Top Finding |
|--------|-------|---------|--------|--------|-------------|
| 4cos90/dify-sharepoint-embedded | 0 | 4 | 0 | 1 | Reads sensitive data (line 10,12,13,14,34,52,64,65,72,78,79, |
| 7nohe/backlog/backlog-0.0.3 | 0 | 5 | 0 | 1 | Reads sensitive data (line 23,24,25,30,33) and sends HTTP re |
| LinkedIn/linkedin/linkedin | 0 | 5 | 0 | 2 | Reads sensitive data (line 8,13,14,17,21,43,44,45,60,61,83,8 |
| LogicOber/better-e2b-sandbox/Better-E2B-Sandbox | 0 | 6 | 10 | 12 | Reads sensitive data (line 100,101,103,104) and sends HTTP r |
| ParkerWen/volcengine_ai/volcengine_ai-0.0.2 | 0 | 2 | 8 | 1 | Reads sensitive data (line 6,29,696) and sends HTTP request  |
| allenyzx/enhancing_function_agent/enhancing_function_agent | 0 | 4 | 4 | 1 | eval() with dynamic input |
| anakin/anakin/anakin_0.0.2 | 0 | 5 | 0 | 1 | Reads sensitive data (line 17) and sends HTTP request (line  |
| axdlee/sophnet/sophnet-0.0.5 | 0 | 3 | 4 | 1 | Reads sensitive data (line 8,34,39,45,71,76,86,92,93,138,143 |
| bowenliang123/md_exporter/md_exporter | 0 | 7 | 11 | 2 | Reads sensitive data (line 872,914,927,1331,1424,1441,4177,5 |
| cashfree/cashfree_payments/cashfree_payments-0.0.8 | 0 | 7 | 3 | 15 | Reads sensitive data (line 78,81,82,83,84,140,142,147,150,15 |
| dupdub/dupdub_tool/dupdub-tool-0.0.3 | 0 | 4 | 0 | 1 | Reads sensitive data (line 29) and sends HTTP request (line  |
| eric-2369/zoominfo/zoominfo-0.0.1 | 0 | 4 | 0 | 1 | Reads sensitive data (line 15,18,19,29) and sends HTTP reque |
| exa-labs/exa | 0 | 4 | 0 | 1 | Reads sensitive data (line 12) and sends HTTP request (line  |
| gptproto/gptproto_tools-0.0.53 | 0 | 30 | 0 | 1 | Reads sensitive data (line 23,24) and sends HTTP request (li |
| higress/model-plugin/higress-0.0.3 | 0 | 4 | 0 | 2 | Reads sensitive data (line 12,40,42,45,46,51,59,62,67,78,90, |
| hjlarry/draw/draw-0.0.1 | 0 | 17 | 11 | 1 | Reads sensitive data (line 256) and sends HTTP request (line |
| kito/kito-dify | 0 | 4 | 6 | 1 | Python exec() with dynamic input |
| lfenghx/mini_claw/mini_claw-1.0.0 | 0 | 5 | 4 | 4 | Reads sensitive data (line 75,153,341,442) and sends HTTP re |
| linkupapi/linkupapi-for-linkedin/linkupapi-for-linkedin-0.0.1 | 0 | 4 | 0 | 1 | Reads sensitive data (line 13,14) and sends HTTP request (li |
| logicober/browser-use-cloud/browser-use-cloud | 0 | 4 | 0 | 18 | Reads sensitive data (line 11,12) and sends HTTP request (li |
| petrus/mercury_tools/mercury_tools-0.2.9 | 0 | 8 | 13 | 1 | Reads sensitive data (line 10,22,28,35,43,44,45,51,55,64,65, |
| petrus/quickbooks/quickbooks-0.2.10 | 0 | 26 | 3 | 1 | Reads sensitive data (line 12,29,35,42,50,51,52,58,62,77,78, |
| petrus/quickbooks_payments/quickbooks_payments-0.1.9 | 0 | 5 | 0 | 1 | Reads sensitive data (line 10,25,31,38,46,47,48,54,58,71,72, |
| r3-yamauchi/my_aws_tools/my_aws_tools | 0 | 4 | 0 | 21 | Reads sensitive data (line 25,57,59,60) and sends HTTP reque |
| sawyer-shi/hailuo_aigc/hailuo_aigc-0.0.1 | 0 | 7 | 0 | 1 | Reads sensitive data (line 13,15) and sends HTTP request (li |
| sawyer-shi/seedream_aigc/seedream_aigc-0.0.1 | 0 | 8 | 0 | 1 | Reads sensitive data (line 11,13) and sends HTTP request (li |
| sawyer-shi/tongyi_aigc/tongyi_aigc-0.0.1 | 0 | 11 | 0 | 3 | Reads sensitive data (line 11,13) and sends HTTP request (li |
| shaoruidong/dify-plugin-volcengine-ai | 0 | 2 | 8 | 1 | Reads sensitive data (line 6,29,696) and sends HTTP request  |
| vip2193/wecondifyplugin | 0 | 5 | 0 | 3 | Reads sensitive data (line 24,25) and sends HTTP request (li |
| witmeng/ragflow-api/ragflow-api | 0 | 6 | 2 | 1 | Reads sensitive data (line 22,23,24) and sends HTTP request  |
| wwwzhouhui/qwen-image/qwen_text2image_0.0.4 | 0 | 5 | 2 | 17 | Reads sensitive data (line 73) and sends HTTP request (line  |
| xiaobao_plugin/yinxiangnote/yingxiangnote | 0 | 109 | 2364 | 68 | Reads sensitive data (line 382,390,439,444,451,568,576,595,5 |
| yasu89/redmine/redmine-0.1.0 | 0 | 4 | 0 | 5 | Reads sensitive data (line 11,12,13) and sends HTTP request  |
| yaxuanm/qdrant/qdrant-0.0.1 | 0 | 2 | 20 | 1 | Reads sensitive data (line 13,18,34,35,36,37,38,41,42,58,60) |
| yevanchen/exa/exa-0.0.5 | 0 | 4 | 0 | 1 | Reads sensitive data (line 24,25) and sends HTTP request (li |
| yida/dingtalk_yida/dingtalk_yida | 0 | 8 | 0 | 1 | Reads sensitive data (line 12,13,14) and sends HTTP request  |
| smart_doc_generator/smart_doc_generator-1.1.0 | 1 | 3 | 1 | 8 | Reads sensitive data (line 482,901,1032) and sends HTTP requ |
| thierrypdamiba/qdrant/qdrant-0.0.1 | 1 | 1 | 9 | 1 | Reads sensitive data (line 13,18,34,35,36,37,38,41,42,58,60) |
| safety_guardrails/safety_guardrails/safety_guardrails | 5 | 3 | 0 | 10 | Reads sensitive data (line 10,12,15,18,21,22,23,82,94,95,102 |
| beersoccer/mem0ai/mem0ai-0.2.9 | 6 | 2 | 5 | 2 | Reads sensitive data (line 56,57) and sends HTTP request (li |
| sumuxi/su_printer/su_printer | 9 | 1 | 8 | 1 | Reads sensitive data (line 137) and sends HTTP request (line |
| xwang152-jack/wechat_official_plugin/wechat_official_plugin-0.0.1 | 15 | 3 | 1 | 1 | Reads sensitive data (line 62,116,173,174) and sends HTTP re |
| JOTO-Tech/schemarag/schemarag-0.1.6 | 16 | 2 | 3 | 5 | Reads sensitive data (line 21) and sends HTTP request (line  |
| stvlynn/x/x-0.0.1 | 18 | 2 | 2 | 8 | Reads sensitive data (line 51,52,56,57,58,59,379,428) and se |
| petrus/mercury_trigger/mercury_trigger-0.4.9 | 21 | 1 | 5 | 7 | Reads sensitive data (line 19,127,129,132,206,209,217,218,21 |
| dwdecon/url_extract_images-0.3.0 | 22 | 2 | 3 | 2 | Reads sensitive data (line 61,63,66,68,69,74,110,122,123,130 |
| BrightData/brightdata-dify-plugin/brightdata_plugin | 23 | 3 | 0 | 1 | Reads sensitive data (line 12) and sends HTTP request (line  |
| LogicOber/zendesk/zendesk | 23 | 3 | 0 | 1 | Reads sensitive data (line 31,32,33,34,35,39) and sends HTTP |
| brightdata/brightdata-web-scraper/brightdata_plugin | 23 | 3 | 0 | 1 | Reads sensitive data (line 12) and sends HTTP request (line  |
| chencanbin/gptproto_tools/gptproto_tools | 23 | 3 | 0 | 1 | Reads sensitive data (line 22,23) and sends HTTP request (li |
| fernvenue/meilisearch/meilisearch-0.1.4 | 23 | 3 | 0 | 1 | Reads sensitive data (line 10,11) and sends HTTP request (li |
| guojingi/itongban | 23 | 3 | 0 | 1 | Reads sensitive data (line 9,15,16) and sends HTTP request ( |
| lcandy/tmdb/tmdb | 23 | 3 | 0 | 1 | Reads sensitive data (line 27,33) and sends HTTP request (li |
| ryan_duff/dify-a2a-plugin/dify-a2a-plugin-0.1.0 | 23 | 3 | 0 | 1 | Reads sensitive data (line 19,23,24,25,26) and sends HTTP re |
| wwwzhouhui/nano_banana/nano_banana_0.0.3 | 24 | 2 | 1 | 9 | Reads sensitive data (line 7,12,19) and sends HTTP request ( |
| Fusic/upstage/upstage-0.0.1 | 26 | 2 | 2 | 4 | Reads sensitive data (line 137,138,140) and sends HTTP reque |
| r3-yamauchi/kintone_file_datasource/kintone_file_datasource | 30 | 2 | 2 | 2 | Reads sensitive data (line 108,181,235,462,469,470,471) and  |
| upstage-document-parser/upstage-document-parser | 31 | 1 | 5 | 2 | Reads sensitive data (line 70,132,169,222,503,656,754,780,80 |
| Cloudsway/reader/cloudsway_reader | 32 | 2 | 2 | 1 | Reads sensitive data (line 75,77,78,80,85,171,193,195,197) a |
| JiekouAI/JiekouAI/jiekouai | 33 | 1 | 5 | 1 | Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,10 |
| burncloud/burncloud/burncloud | 33 | 1 | 5 | 1 | Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,10 |
| cnjasonz/ppio/ppio-0.0.6 | 33 | 1 | 5 | 1 | Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,10 |
| novita/novita/novita-0.0.7 | 33 | 1 | 5 | 1 | Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,10 |
| ppio/ppio/ppio | 33 | 1 | 5 | 1 | Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,10 |
| gu/gmail/gmail-0.0.1 | 40 | 2 | 1 | 1 | Reads sensitive data (line 8,17,19,22,26,48,57,68,69,70,84,8 |
| logicober/cursor-background-agents/cursor-background-agents | 40 | 2 | 1 | 1 | Reads sensitive data (line 11) and sends HTTP request (line  |
| modelhub_nanobanana/gemini | 40 | 2 | 1 | 1 | Reads sensitive data (line 13,15,16,35,47,48,55,61,62,63,65, |
| qin2dim/table_cooking/table-cooking-0.0.3 | 40 | 2 | 1 | 1 | Reads sensitive data (line 94) and sends HTTP request (line  |
| zjbjbj/cuu_pay/cuu_pay-0.0.4 | 42 | 2 | 0 | 4 | Reads sensitive data (line 24,30,35,36,42,43) and sends HTTP |
| aliyun/ai-gateway/ai-gateway-0.0.2 | 46 | 2 | 0 | 2 | Reads sensitive data (line 14,15,16,42,43,44,45,49,60,64,129 |
| anspire/browser_agent/anspire_browser_use | 46 | 2 | 0 | 2 | Reads sensitive data (line 12) and sends HTTP request (line  |
| asiainfo/ontology_search/ontology_search-0.0.4 | 46 | 2 | 0 | 2 | Reads sensitive data (line 27,35,196) and sends HTTP request |
| Organization/chuangsiai/chuangsiai | 48 | 2 | 0 | 1 | Reads sensitive data (line 8,14,15) and sends HTTP request ( |
| Organization/linuxdo/linuxdo | 48 | 2 | 0 | 1 | Reads sensitive data (line 25,26,42,73) and sends HTTP reque |
| agimaster/crawl4ai/crawl4ai | 48 | 2 | 0 | 1 | Reads sensitive data (line 22) and sends HTTP request (line  |
| ai302/302ai-provider | 48 | 2 | 0 | 1 | Reads sensitive data (line 16,40,51,59,61,66,104,106,109,115 |
| aiping/aiping-dify-plugin-tools | 48 | 2 | 0 | 1 | Reads sensitive data (line 32,39,100,109) and sends HTTP req |
| allenwriter/doubao-image-and-video-generator | 48 | 2 | 0 | 1 | Reads sensitive data (line 42,98,107) and sends HTTP request |
| baidu/qianfan/baidu_ai_search | 48 | 2 | 0 | 1 | Reads sensitive data (line 17,19,28) and sends HTTP request  |
| bdim/zhipuai-web-search/zhipuai-web-search | 48 | 2 | 0 | 1 | Reads sensitive data (line 8,9) and sends HTTP request (line |
| birdlex/chkp-lakera-for-dify/chkp-lakera-for-dify-0.0.1 | 48 | 2 | 0 | 1 | Reads sensitive data (line 10,11,40,52,53,60,66,67,68,70,72) |
| bochaai/bocha/bocha | 48 | 2 | 0 | 1 | Reads sensitive data (line 69) and sends HTTP request (line  |
| doubao_tts/dify_doubao_tts_tools | 48 | 2 | 0 | 1 | Reads sensitive data (line 10,11,12,13) and sends HTTP reque |
| dp/bohrium-tool-paper/bohrium-tool-paper-0.0.2 | 48 | 2 | 0 | 1 | Reads sensitive data (line 8,12) and sends HTTP request (lin |
| eric-2369/salesforce/salesforce-0.0.1 | 48 | 2 | 0 | 1 | Reads sensitive data (line 21,22,23,70) and sends HTTP reque |
| hankookncompany/snowflake/snowflake-0.0.1 | 48 | 2 | 0 | 1 | Reads sensitive data (line 13,14,45,66) and sends HTTP reque |
| hjlarry/small_pay/small_pay-0.0.3 | 48 | 2 | 0 | 1 | Reads sensitive data (line 9,13) and sends HTTP request (lin |
| junjiem/dat_tool/dify-plugin-tools-dat | 48 | 2 | 0 | 1 | Reads sensitive data (line 8,9,13) and sends HTTP request (l |
| leads/linkedintel | 48 | 2 | 0 | 1 | Reads sensitive data (line 8,9) and sends HTTP request (line |
| memmachine/memmachine | 48 | 2 | 0 | 1 | Reads sensitive data (line 16,17) and sends HTTP request (li |
| memtensor/memos/dify-plugin-memos | 48 | 2 | 0 | 1 | Reads sensitive data (line 48,58) and sends HTTP request (li |
| nsfocus/aigr/aigr | 48 | 2 | 0 | 1 | Reads sensitive data (line 54,55,56) and sends HTTP request  |
| r3-yamauchi/knowledgebase_update/knowledgebase_update | 48 | 2 | 0 | 1 | Reads sensitive data (line 2,56,57,61,62,63) and sends HTTP  |
| sawyer-shi/aliyun_oss/aliyun_oss-0.0.4 | 48 | 2 | 0 | 1 | Reads sensitive data (line 20,60,64,76,77,78,79,80,87,90,93, |
| sawyer-shi/huawei_obs/huawei_obs-0.0.2 | 48 | 2 | 0 | 1 | Reads sensitive data (line 30,38,41,42,143,153,157,162,177)  |
| sawyer-shi/tencent_cos/tencent_cos-0.0.3 | 48 | 2 | 0 | 1 | Reads sensitive data (line 18,70,74,86,87,88,89,90,97,100,10 |
| sawyer-shi/volcengine_tos/volcengine_tos-0.0.2 | 48 | 2 | 0 | 1 | Reads sensitive data (line 16,96,134,149,150,151,152,153,154 |
| stvlynn/lmstudio/lmstudio-0.0.2 | 48 | 2 | 0 | 1 | Reads sensitive data (line 26,46,55,63,72,90,92,95,99,101,11 |
| stvlynn/sftp/sftp-0.0.1 | 48 | 2 | 0 | 1 | Reads sensitive data (line 145,148) and sends HTTP request ( |
| stvlynn/unsplash/unsplash-0.0.1 | 48 | 2 | 0 | 1 | Reads sensitive data (line 23,24,25,119,120,121) and sends H |
| tavan/mineru-tianshu/mineru-tianshu | 48 | 2 | 0 | 1 | Reads sensitive data (line 17,18,23,24,27) and sends HTTP re |
| thetokencompany/ttc_compression/ttc_compression-0.0.2 | 48 | 2 | 0 | 1 | Reads sensitive data (line 11,14,16,19,22,24,48,83) and send |
| yevanchen/mem0/mem0-0.0.3 | 48 | 2 | 0 | 1 | Reads sensitive data (line 10,11) and sends HTTP request (li |
| zeroz-lab/milvus/milvus-0.1.4 | 48 | 2 | 0 | 1 | Reads sensitive data (line 10,14,15,16) and sends HTTP reque |
| Organization/JOTO_DataFocus/Datafocus | 49 | 1 | 2 | 5 | Reads sensitive data (line 173,195,212) and sends HTTP reque |
| jingfelix/kook-notify/kook-notify-0.0.1 | 57 | 1 | 2 | 1 | Reads sensitive data (line 10,15,23,29,35) and sends HTTP re |
| r3-yamauchi/wordpress/wordpress | 57 | 1 | 2 | 1 | Reads sensitive data (line 2,3,19,20,22,23,24,67) and sends  |
| sawyer-shi/smart_excel_kit/smart_excel_kit-0.0.1 | 57 | 1 | 2 | 1 | Python exec() with dynamic input |
| lfenghx/skill_agent/skill_agent | 61 | 1 | 1 | 3 | Reads sensitive data (line 22,97) and sends HTTP request (li |
| Euraxluo/dingtalk-assistant-caller/dingtalk-assistant-caller-0.0.2 | 63 | 1 | 1 | 2 | Reads sensitive data (line 24) and sends HTTP request (line  |
| investoday/stock/investoday-stock-3.0.5 | 63 | 1 | 1 | 2 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| jaguarliu/rookie_rss/rookie-rss | 63 | 1 | 0 | 6 | Reads sensitive data (line 12) and sends HTTP request (line  |
| oy_plat/gen_pptx/oy-gen-pptx | 63 | 1 | 1 | 2 | Reads sensitive data (line 32,40,109,236,257) and sends HTTP |
| qingconnect/qing_connect | 63 | 1 | 0 | 6 | Reads sensitive data (line 24) and sends HTTP request (line  |
| stock_research/stock_researcher | 63 | 1 | 1 | 2 | Reads sensitive data (line 42) and sends HTTP request (line  |
| Xcode-wu/trtc-conai/trtc-conai | 65 | 1 | 1 | 1 | Reads sensitive data (line 112,113,115,174,185,186,190) and  |
| ayi1337/qweather/qweather-0.0.9 | 65 | 1 | 1 | 1 | Reads sensitive data (line 22,23,100) and sends HTTP request |
| comlan/auzre_search | 65 | 1 | 1 | 1 | Reads sensitive data (line 32) and sends HTTP request (line  |
| cybozu/kintone/kintone | 65 | 1 | 1 | 1 | Reads sensitive data (line 186) and sends HTTP request (line |
| leo-digital/doubao-seedream/doubao-seedream-1.0.1 | 65 | 1 | 1 | 1 | Reads sensitive data (line 20,25,30,43,49,59,71,72,79,85,86, |
| stackit_model_serving/stackit-model-serving-dify-plugin | 65 | 1 | 1 | 1 | Reads sensitive data (line 6,14,16,19,23,28,47,55,58,62) and |
| weaviate/weaviate_plugin/weaviate_plugin-0.0.1 | 65 | 1 | 1 | 1 | Reads sensitive data (line 109,125) and sends HTTP request ( |
| zm1990s/ai_security_api/panw_ai_security_api_for_dify | 65 | 1 | 1 | 1 | Reads sensitive data (line 21,22,27,45) and sends HTTP reque |
| bitly_shortner/bitly-shortner | 69 | 1 | 0 | 3 | Reads sensitive data (line 13,14,24) and sends HTTP request  |
| stvlynn/edgeone/edgeone-0.0.2 | 69 | 1 | 0 | 3 | Reads sensitive data (line 9,11) and sends HTTP request (lin |
| wwwzhouhui/sora2/sora2_0.0.2 | 69 | 1 | 0 | 3 | Reads sensitive data (line 23) and sends HTTP request (line  |
| abesticode/knowledge_pro/dify-plugin-knowledge-pro | 71 | 1 | 0 | 2 | Reads sensitive data (line 227,228,229,357,358) and sends HT |
| aliyun/ai_guardrails/ai_guardrails | 71 | 1 | 0 | 2 | Reads sensitive data (line 93,97) and sends HTTP request (li |
| anspire/ai_search/anspire_search | 71 | 1 | 0 | 2 | Reads sensitive data (line 175,176) and sends HTTP request ( |
| benyuereal/moments8 | 71 | 1 | 0 | 2 | Reads sensitive data (line 9,26,30,31,36,67,74,80,86,92,98,1 |
| jingfelix/niutrans/niutrans-0.1.0 | 71 | 1 | 0 | 2 | Reads sensitive data (line 34,61,68,84,147) and sends HTTP r |
| legal_clause_researcher/legal_clause_researcher | 71 | 1 | 0 | 2 | Reads sensitive data (line 42,43,44,47,50) and sends HTTP re |
| moments_infinity/moments8 | 71 | 1 | 0 | 2 | Reads sensitive data (line 9,26,30,31,36,67,74,80,86,92,98,1 |
| paiahuai/bilibili_subtitle/bilibili_subtitle-0.0.1 | 71 | 1 | 0 | 2 | Reads sensitive data (line 112,114,116,118,119,127,505,508,5 |
| stock_researcher/animo_visuals | 71 | 1 | 0 | 2 | Reads sensitive data (line 37,38,40,45,47) and sends HTTP re |
| stvlynn/agentapi/agentapi-0.0.1 | 71 | 1 | 0 | 2 | Reads sensitive data (line 10) and sends HTTP request (line  |
| 16api/nano-banana-pro/nano_banana_pro-0.1.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 76,77,107) and sends HTTP request |
| Cloudfall-RedKernel/redkernel | 73 | 1 | 0 | 1 | Reads sensitive data (line 27) and sends HTTP request (line  |
| Cloudsway/cloudswayai_skyrouter_tool/cloudswayai_skyrouter_tool | 73 | 1 | 0 | 1 | Reads sensitive data (line 8,10,11,13,14,30) and sends HTTP  |
| Endless-zby/dify_redis_manage/dify_redis_manage-0.0.6 | 73 | 1 | 0 | 1 | Reads sensitive data (line 21,26,27,28) and sends HTTP reque |
| Endless-zby/redis_manage/redis_manage | 73 | 1 | 0 | 1 | Reads sensitive data (line 21,26,27,28) and sends HTTP reque |
| FinancialAI/financialdatasets/financialdatasets | 73 | 1 | 0 | 1 | Reads sensitive data (line 45,47,50,64,83,85,88,102) and sen |
| LogicOber/openai_audio/openai_audio-0.0.4 | 73 | 1 | 0 | 1 | Reads sensitive data (line 13,16,137) and sends HTTP request |
| Organization/Intsig/xparse | 73 | 1 | 0 | 1 | Reads sensitive data (line 20,26,27,28,29,32,37,42,46,47,48, |
| Organization/antvis/dify-plugin-visualization | 73 | 1 | 0 | 1 | Reads sensitive data (line 36,37,38) and sends HTTP request  |
| Organization/perfxlab_ocrservice/dify-plugin-ocr-service | 73 | 1 | 0 | 1 | Reads sensitive data (line 27) and sends HTTP request (line  |
| ace-step/ace_step_v1_5_online_free/ace_step_v1_5_online_free-0.0.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 42) and sends HTTP request (line  |
| ada/data_analysis/data_analysis | 73 | 1 | 0 | 1 | Reads sensitive data (line 16) and sends HTTP request (line  |
| agentql/agentql/agentql_tool_1.0.0 | 73 | 1 | 0 | 1 | Reads sensitive data (line 32) and sends HTTP request (line  |
| agora/convoai/convoai | 73 | 1 | 0 | 1 | Reads sensitive data (line 115,116,118,177,188,189,193) and  |
| anspire/we-com-ai-table/anspire-wecom-ai-table | 73 | 1 | 0 | 1 | Reads sensitive data (line 22,28,34,35) and sends HTTP reque |
| bdim/steam/steam | 73 | 1 | 0 | 1 | Reads sensitive data (line 27,29) and sends HTTP request (li |
| blinkospace/blinko/blinko | 73 | 1 | 0 | 1 | Reads sensitive data (line 12,14,17,24,53,54,55) and sends H |
| cdnxy/hellodb/hellodb | 73 | 1 | 0 | 1 | Reads sensitive data (line 32,33) and sends HTTP request (li |
| digitforce/data_analysis/data_analysis | 73 | 1 | 0 | 1 | Reads sensitive data (line 15) and sends HTTP request (line  |
| dinq/dinq/dinq | 73 | 1 | 0 | 1 | Reads sensitive data (line 13) and sends HTTP request (line  |
| dts/dify-dts-plugin | 73 | 1 | 0 | 1 | Reads sensitive data (line 30,31) and sends HTTP request (li |
| easylink-ai/easydoc-plugin/easydoc-dify-plugin | 73 | 1 | 0 | 1 | Reads sensitive data (line 22,47,50,51,52,68,69,70,71,72,78, |
| gaurav0651/podcast_studio/podcast_studio-1.0.4 | 73 | 1 | 0 | 1 | Reads sensitive data (line 118,119,120,122,123,124,135) and  |
| gentelai/gentel/gentel-0.0.2 | 73 | 1 | 0 | 1 | Reads sensitive data (line 12,13) and sends HTTP request (li |
| github_repo_intel/github_repo_intel | 73 | 1 | 0 | 1 | Reads sensitive data (line 42) and sends HTTP request (line  |
| harrywang/postmark/postmark | 73 | 1 | 0 | 1 | Reads sensitive data (line 11,12,38,39) and sends HTTP reque |
| heavi/voicemaker | 73 | 1 | 0 | 1 | Reads sensitive data (line 24,25) and sends HTTP request (li |
| hjlarry/knowledge/knowledge-0.0.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 51,52) and sends HTTP request (li |
| infiniai/infiniai | 73 | 1 | 0 | 1 | Reads sensitive data (line 5,20,27,30,36,51,52,56,65) and se |
| inlei/mistral_ocr | 73 | 1 | 0 | 1 | Reads sensitive data (line 16,126) and sends HTTP request (l |
| investoday/announcement/investoday-announcement-2.0.2 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| investoday/base/investoday-base-2.0.3 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| investoday/fund/investoday-fund-2.3.3 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| investoday/index/investoday-index-2.0.3 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| investoday/industry/investoday-industry-2.0.2 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| investoday/llm/investoday-llm-1.0.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| investoday/market/investoday-market-2.0.2 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| investoday/news/investoday-news-2.0.3 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| investoday/research-report/investoday-research-report-2.0.3 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| investoday/stock-hk/investoday-stock-hk-1.0.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 54,55) and sends HTTP request (li |
| itgo067/aliyun-wanx | 73 | 1 | 0 | 1 | Reads sensitive data (line 13,14) and sends HTTP request (li |
| itning/bark-notify/bark-notify | 73 | 1 | 0 | 1 | Reads sensitive data (line 32,33,34) and sends HTTP request  |
| kevintsai/linebot/linebot | 73 | 1 | 0 | 1 | Reads sensitive data (line 398,402) and sends HTTP request ( |
| lindorm/lindormai/lindormai-0.0.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 5,14,15,16,17,18,19,20,61,63,66,7 |
| logicober/openai_audio/openai_audio | 73 | 1 | 0 | 1 | Reads sensitive data (line 13,16,137) and sends HTTP request |
| pedrogomes02/ibm_watsonx/ibm_watsonx-0.1.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 7,13,15,18,28,36,37,40,43,47) and |
| petrus/employee_roster/employee_roster-0.0.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 12,14,15,47,52,54,55,58,71,75,112 |
| qaip-search/qaip-search | 73 | 1 | 0 | 1 | Reads sensitive data (line 18) and sends HTTP request (line  |
| sawyer-shi/kling_aigc/kling_aigc-0.0.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 11,13,14,105,106,107) and sends H |
| scrapelesshq/deep_serpapi/deep_serpapi | 73 | 1 | 0 | 1 | Reads sensitive data (line 29) and sends HTTP request (line  |
| seekysense/docfactory/docfactory-0.0.11 | 73 | 1 | 0 | 1 | Reads sensitive data (line 11,16,17,18,20) and sends HTTP re |
| social-flow/social-flow | 73 | 1 | 0 | 1 | Reads sensitive data (line 40,43) and sends HTTP request (li |
| tdcktz/sse_request_tool/sse_request_tool-0.0.5 | 73 | 1 | 0 | 1 | Reads sensitive data (line 640,641,642,644,645) and sends HT |
| uezo/voicevox-tts | 73 | 1 | 0 | 1 | Reads sensitive data (line 12,28,38,44,45,46,48,49,52,55,62, |
| uspeedo/uspeedo-email | 73 | 1 | 0 | 1 | Reads sensitive data (line 70,71,72) and sends HTTP request  |
| watercrawl/watercrawl_datasource/watercrawl-datasource-dify-plugin-v0.1.0 | 73 | 1 | 0 | 1 | Reads sensitive data (line 11,12,18) and sends HTTP request  |
| wwwzhouhui/nano_banana2/nano_banana2_0.0.2 | 73 | 1 | 0 | 1 | Reads sensitive data (line 65,163,303,365) and sends HTTP re |
| xmindltd/mapify/mapify-dify-plugin | 73 | 1 | 0 | 1 | Reads sensitive data (line 51) and sends HTTP request (line  |
| yeaosound/tensdaq/tensdaq-0.0.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 5,20,29,35,50,54,63) and sends HT |
| yeaosound/x-aio/x-aio | 73 | 1 | 0 | 1 | Reads sensitive data (line 5,20,29,35,50,54,63) and sends HT |
| yevanchen/goto_human/goto_human-0.0.2 | 73 | 1 | 0 | 1 | Reads sensitive data (line 12) and sends HTTP request (line  |
| yt-koike/runpod/dify-runpod-0.0.1 | 73 | 1 | 0 | 1 | Reads sensitive data (line 44) and sends HTTP request (line  |
| yusukemurata/semantic_scholar/semantic_scholar | 73 | 1 | 0 | 1 | Reads sensitive data (line 24,25) and sends HTTP request (li |

### High Risk Details

#### 4cos90/dify-sharepoint-embedded (Score: 0)

- **HIGH** `provider/sharepointtool.py:39`: Reads sensitive data (line 10,12,13,14,34,52,64,65,72,78,79,80,82,84) and sends HTTP request (line 39) — possible exfiltration
- **HIGH** `tools/tool_get_access_token.py:51`: Reads sensitive data (line 12,13,14,15,46) and sends HTTP request (line 51) — possible exfiltration
- **HIGH** `tools/tool_list_files.py:59`: Reads sensitive data (line 13,14,15,16,54) and sends HTTP request (line 59) — possible exfiltration
- **HIGH** `tools/tool_semantic_search.py:59`: Reads sensitive data (line 13,14,15,16,54) and sends HTTP request (line 59,113) — possible exfiltration

#### 7nohe/backlog/backlog-0.0.3 (Score: 0)

- **HIGH** `tools/_utils.py:2`: Reads sensitive data (line 23,24,25,30,33) and sends HTTP request (line 2,43,76) — possible exfiltration
- **HIGH** `tools/add_comment.py:22`: Reads sensitive data (line 3,13,14,17,29) and sends HTTP request (line 22) — possible exfiltration
- **HIGH** `tools/create_issue.py:1`: Reads sensitive data (line 8,22,23,27,66,67,68,92) and sends HTTP request (line 1,57,75,79) — possible exfiltration
- **HIGH** `tools/get_issue.py:1`: Reads sensitive data (line 5,15,16,25,54) and sends HTTP request (line 1,23) — possible exfiltration
- **HIGH** `tools/list_issue_types.py:1`: Reads sensitive data (line 5,15,16,21,23,24,25,32,45) and sends HTTP request (line 1,30) — possible exfiltration

#### LinkedIn/linkedin/linkedin (Score: 0)

- **HIGH** `provider/linkedin.py:2`: Reads sensitive data (line 8,13,14,17,21,43,44,45,60,61,83,84,96,97,98,100,101,102,103) and sends HTTP request (line 2,41,75) — possible exfiltration
- **HIGH** `test_oauth.py:5`: Reads sensitive data (line 14) and sends HTTP request (line 5,41,42) — possible exfiltration
- **HIGH** `test_plugin.py:39`: Reads sensitive data (line 31,33) and sends HTTP request (line 39) — possible exfiltration
- **HIGH** `test_plugin_v2.py:50`: Reads sensitive data (line 42,44,78,94,98) and sends HTTP request (line 50,98,99) — possible exfiltration
- **HIGH** `tools/linkedin.py:149`: Reads sensitive data (line 21,22,24,25,27,31,33,34,36,38,42,46,47,49,52) and sends HTTP request (line 149,203,226,230) — possible exfiltration

#### LogicOber/better-e2b-sandbox/Better-E2B-Sandbox (Score: 0)

- **HIGH** `tools/_claude_permissions.py:106`: Reads sensitive data (line 100,101,103,104) and sends HTTP request (line 106,184,185,186,187,188,189) — possible exfiltration
- **HIGH** `tools/create-nextjs-bun-sandbox.py:134`: Reads sensitive data (line 33,65,66,67) and sends HTTP request (line 134) — possible exfiltration
- **HIGH** `tools/guard-output.py:10`: Reads sensitive data (line 45,47) and sends HTTP request (line 10,123) — possible exfiltration
- **HIGH** `tools/install-packages.py:18`: Reads sensitive data (line 59,61) and sends HTTP request (line 18) — possible exfiltration
- **HIGH** `tools/create-nextjs-bun-sandbox.py:134`: pipe-to-shell: downloads and executes remote code

#### ParkerWen/volcengine_ai/volcengine_ai-0.0.2 (Score: 0)

- **HIGH** `legacy/volc_sdk/VisualService.py:172`: Reads sensitive data (line 6,29,696) and sends HTTP request (line 172) — possible exfiltration
- **HIGH** `legacy/volc_sdk/base/service.py:3`: Reads sensitive data (line 19,22,25,40,59,82,97,198,201) and sends HTTP request (line 3,63,85,98,105) — possible exfiltration
- **MEDIUM** `tools/i2i_portrait_photo.yaml:145`: Prompt injection: Claims elevated priority/privilege
- **MEDIUM** `tools/i2i_portrait_photo.yaml:148`: Prompt injection: Claims elevated priority/privilege
- **MEDIUM** `tools/jimeng_vgfm_i2v_l20.yaml:113`: Prompt injection: Unicode formatting/control characters (steganographic attack)

#### allenyzx/enhancing_function_agent/enhancing_function_agent (Score: 0)

- **HIGH** `strategies/enhancing_function_agent.py:73`: eval() with dynamic input
- **HIGH** `strategies/enhancing_function_agent.py:103`: eval() with dynamic input
- **HIGH** `strategies/enhancing_function_agent.py:158`: eval() with dynamic input
- **HIGH** `strategies/enhancing_function_agent.py:200`: eval() with dynamic input
- **MEDIUM** `strategies/enhancing_function_agent.py:73`: [code-exec] eval() with non-literal input

#### anakin/anakin/anakin_0.0.2 (Score: 0)

- **HIGH** `tools/agentic_search.py:31`: Reads sensitive data (line 17) and sends HTTP request (line 31) — possible exfiltration
- **HIGH** `tools/batch_scraper.py:49`: Reads sensitive data (line 17) and sends HTTP request (line 49) — possible exfiltration
- **HIGH** `tools/search.py:30`: Reads sensitive data (line 14) and sends HTTP request (line 30) — possible exfiltration
- **HIGH** `tools/url_scraper.py:44`: Reads sensitive data (line 17) and sends HTTP request (line 44) — possible exfiltration
- **HIGH** `tools/web_scraper.py:49`: Reads sensitive data (line 18) and sends HTTP request (line 49) — possible exfiltration

#### axdlee/sophnet/sophnet-0.0.5 (Score: 0)

- **HIGH** `models/speech2text/speech2text.py:61`: Reads sensitive data (line 8,34,39,45,71,76,86,92,93,138,143,147,148,149,152,154,156,161,163,174,175,181,184,186,190,221,225,229,233,237,251,275) and sends HTTP request (line 61,172) — possible exfiltration
- **HIGH** `models/text_embedding/text_embedding.py:67`: Reads sensitive data (line 20,31,40,41,42,80,89,93,102,103,107,109,111,151,155,156,157,158,159,167,168,171,174) and sends HTTP request (line 67,100) — possible exfiltration
- **HIGH** `models/tts/tts.py:124`: Reads sensitive data (line 17,72,82,93,103,105,108,114,120,147,153,159,172,177,181,182,183,186,188,190,197,203,204,208,210,212,217,232,303,308,314,318,322,340,345,346,348,349,351,352,354,355,369) and sends HTTP request (line 124,163,201) — possible exfiltration
- **MEDIUM** `models/speech2text/speech2text.py:278`: Hex-encoded string sequence
- **MEDIUM** `models/speech2text/speech2text.py:283`: Hex-encoded string sequence

#### bowenliang123/md_exporter/md_exporter (Score: 0)

- **HIGH** `tools/md_to_pptx/md2pptx-5.4.3/md2pptx.py:34`: Reads sensitive data (line 872,914,927,1331,1424,1441,4177,5127,6321,6328) and sends HTTP request (line 34,914,915,1331,1333) — possible exfiltration
- **HIGH** `tools/md_to_pptx/md2pptx-5.4.3/md2pptx.py:5127`: Python exec() with dynamic input
- **HIGH** `tools/md_to_pptx/md2pptx-5.4.3/md2pptx.py:6321`: Python exec() with dynamic input
- **HIGH** `tools/md_to_pptx/md2pptx-5.4.3/md2pptx.py:6328`: Python exec() with dynamic input
- **HIGH** `tools/md_to_pptx/md2pptx-5.4.3/md2pptx.py:6343`: Python exec() with dynamic input

#### cashfree/cashfree_payments/cashfree_payments-0.0.8 (Score: 0)

- **HIGH** `auth_utils.py:109`: Reads sensitive data (line 78,81,82,83,84,140,142,147,150,151,152,157,160,161,162) and sends HTTP request (line 109) — possible exfiltration
- **HIGH** `tools/cancel_payment_link.py:86`: Reads sensitive data (line 45,47,48,49,51,52,53,54,59,66,76) and sends HTTP request (line 86) — possible exfiltration
- **HIGH** `tools/create_cashgram.py:172`: Reads sensitive data (line 111,113,114,115,117,118,119,120,125,132,143,203) and sends HTTP request (line 172) — possible exfiltration
- **HIGH** `tools/create_order.py:210`: Reads sensitive data (line 119,121,122,123,125,126,127,128,133,140,150,207) and sends HTTP request (line 210) — possible exfiltration
- **HIGH** `tools/create_payment_link.py:215`: Reads sensitive data (line 103,105,106,107,109,110,111,112,117,124,134) and sends HTTP request (line 215) — possible exfiltration

#### dupdub/dupdub_tool/dupdub-tool-0.0.3 (Score: 0)

- **HIGH** `tools/dubbing.py:39`: Reads sensitive data (line 29) and sends HTTP request (line 39) — possible exfiltration
- **HIGH** `tools/parse_video_source.py:22`: Reads sensitive data (line 10) and sends HTTP request (line 22) — possible exfiltration
- **HIGH** `tools/transcribe_speech.py:28`: Reads sensitive data (line 10) and sends HTTP request (line 28) — possible exfiltration
- **HIGH** `tools/voice_cloning.py:28`: Reads sensitive data (line 10) and sends HTTP request (line 28) — possible exfiltration

#### eric-2369/zoominfo/zoominfo-0.0.1 (Score: 0)

- **HIGH** `provider/zoominfo.py:69`: Reads sensitive data (line 15,18,19,29) and sends HTTP request (line 69) — possible exfiltration
- **HIGH** `tools/enrich_company.py:75`: Reads sensitive data (line 20,21,96) and sends HTTP request (line 75) — possible exfiltration
- **HIGH** `tools/enrich_contact.py:90`: Reads sensitive data (line 20,21,111) and sends HTTP request (line 90) — possible exfiltration
- **HIGH** `tools/enrich_news.py:107`: Reads sensitive data (line 21,22,128) and sends HTTP request (line 107) — possible exfiltration

#### exa-labs/exa (Score: 0)

- **HIGH** `tools/exa_answer.py:33`: Reads sensitive data (line 12) and sends HTTP request (line 33) — possible exfiltration
- **HIGH** `tools/exa_contents.py:50`: Reads sensitive data (line 12) and sends HTTP request (line 50) — possible exfiltration
- **HIGH** `tools/exa_create_webset.py:53`: Reads sensitive data (line 14) and sends HTTP request (line 53) — possible exfiltration
- **HIGH** `tools/exa_search.py:78`: Reads sensitive data (line 12) and sends HTTP request (line 78) — possible exfiltration

#### gptproto/gptproto_tools-0.0.53 (Score: 0)

- **HIGH** `tools/claude_opus_45_text_generation.py:118`: Reads sensitive data (line 23,24) and sends HTTP request (line 118) — possible exfiltration
- **HIGH** `tools/claude_sonnet_45_text_generation.py:116`: Reads sensitive data (line 22,23) and sends HTTP request (line 116) — possible exfiltration
- **HIGH** `tools/gemini_25_flash_lite_text_generation.py:111`: Reads sensitive data (line 22,23) and sends HTTP request (line 111) — possible exfiltration
- **HIGH** `tools/gemini_25_flash_text_to_image.py:85`: Reads sensitive data (line 22,23) and sends HTTP request (line 85) — possible exfiltration
- **HIGH** `tools/gemini_25_pro_text_generation.py:169`: Reads sensitive data (line 23,24) and sends HTTP request (line 169) — possible exfiltration

#### higress/model-plugin/higress-0.0.3 (Score: 0)

- **HIGH** `models/rerank/protocols/dashscope_rerank.py:139`: Reads sensitive data (line 12,40,42,45,46,51,59,62,67,78,90,91,125,128,136,152,192) and sends HTTP request (line 139) — possible exfiltration
- **HIGH** `models/text_embedding/protocols/openai_compatible.py:77`: Reads sensitive data (line 13,41,43,46,47,55,56,64,67,75,85,86,93,94,98,99,102,104,107,108,113,123,137,138,150,151,184,187,195,222,245,254) and sends HTTP request (line 77,197) — possible exfiltration
- **HIGH** `models/utils/auth.py:20`: Reads sensitive data (line 35,42,109,112,148,154,185,230,233,234,235,520,526,531,571,575,578,581,585,588,605,623,631,634,642,650,653) and sends HTTP request (line 20,289) — possible exfiltration
- **HIGH** `models/utils/url.py:6`: Reads sensitive data (line 11,13,15,19,22) and sends HTTP request (line 6) — possible exfiltration

#### hjlarry/draw/draw-0.0.1 (Score: 0)

- **HIGH** `endpoints/static/assets/katex-CfZphoad.js:256`: Reads sensitive data (line 256) and sends HTTP request (line 256,260) — possible exfiltration
- **HIGH** `endpoints/static/assets/createText-2e5e7dd3-CF_9T4qN.js:3`: Python exec() with dynamic input
- **HIGH** `endpoints/static/assets/ganttDiagram-c361ad54-BVpcd4Hw.js:1`: Python exec() with dynamic input
- **HIGH** `endpoints/static/assets/ganttDiagram-c361ad54-BVpcd4Hw.js:6`: Python exec() with dynamic input
- **HIGH** `endpoints/static/assets/graph-BqLGYfpl.js:1`: Python exec() with dynamic input

#### kito/kito-dify (Score: 0)

- **HIGH** `tools/get_mcp_service.py:63`: Python exec() with dynamic input
- **HIGH** `tools/run_command.py:65`: Python exec() with dynamic input
- **HIGH** `tools/start_mcpserver.py:51`: Python exec() with dynamic input
- **HIGH** `tools/stop_mcpserver.py:50`: Python exec() with dynamic input
- **MEDIUM** `tools/start_mcpserver.py:50`: Request to localhost — verify if intentional

#### lfenghx/mini_claw/mini_claw-1.0.0 (Score: 0)

- **HIGH** `tools/TM.py:16`: Reads sensitive data (line 75,153,341,442) and sends HTTP request (line 16,17) — possible exfiltration
- **HIGH** `tools/mini_claw.py:2227`: Reads sensitive data (line 617,1254,2436) and sends HTTP request (line 2227) — possible exfiltration
- **HIGH** `utils/mini_claw_runtime.py:715`: Reads sensitive data (line 345,445,548,623,636,705,727,752,932,996) and sends HTTP request (line 715,721) — possible exfiltration
- **HIGH** `utils/mini_claw_web_fetch.py:8`: Reads sensitive data (line 113,178) and sends HTTP request (line 8,9,10,56,58,106,122,161,176,192,197,200) — possible exfiltration
- **HIGH** `utils/tools.py:9`: Reads sensitive data (line 77,418) and sends HTTP request (line 9,10) — possible exfiltration

#### linkupapi/linkupapi-for-linkedin/linkupapi-for-linkedin-0.0.1 (Score: 0)

- **HIGH** `tools/email_finder.py:54`: Reads sensitive data (line 13,14) and sends HTTP request (line 54) — possible exfiltration
- **HIGH** `tools/email_reverse.py:34`: Reads sensitive data (line 13,14) and sends HTTP request (line 34) — possible exfiltration
- **HIGH** `tools/email_verifier.py:34`: Reads sensitive data (line 13,14) and sends HTTP request (line 34) — possible exfiltration
- **HIGH** `tools/whatsapp_send_message.py:64`: Reads sensitive data (line 13,14) and sends HTTP request (line 64) — possible exfiltration

#### logicober/browser-use-cloud/browser-use-cloud (Score: 0)

- **HIGH** `tools/pause_task.py:52`: Reads sensitive data (line 11,12) and sends HTTP request (line 52) — possible exfiltration
- **HIGH** `tools/resume_task.py:52`: Reads sensitive data (line 11,12) and sends HTTP request (line 52) — possible exfiltration
- **HIGH** `tools/run_task.py:59`: Reads sensitive data (line 11,12) and sends HTTP request (line 59) — possible exfiltration
- **HIGH** `tools/stop_task.py:52`: Reads sensitive data (line 11,12) and sends HTTP request (line 52) — possible exfiltration

#### petrus/mercury_tools/mercury_tools-0.2.9 (Score: 0)

- **HIGH** `provider/mercury_tools.py:2`: Reads sensitive data (line 10,22,28,35,43,44,45,51,55,64,65,91,93,95,102,103,104,110,111,114,116,122,123,164,169,183,186,193,194,234) and sends HTTP request (line 2,41,71,128) — possible exfiltration
- **HIGH** `tools/create_recipient.py:105`: Reads sensitive data (line 47,48,53) and sends HTTP request (line 105) — possible exfiltration
- **HIGH** `tools/customer_management.py:115`: Reads sensitive data (line 23,27) and sends HTTP request (line 115,145) — possible exfiltration
- **HIGH** `tools/internal_transfer.py:84`: Reads sensitive data (line 50,51,56) and sends HTTP request (line 84) — possible exfiltration
- **HIGH** `tools/invoice_management.py:139`: Reads sensitive data (line 24,28) and sends HTTP request (line 139,182,200) — possible exfiltration

#### petrus/quickbooks/quickbooks-0.2.10 (Score: 0)

- **HIGH** `provider/quickbooks.py:4`: Reads sensitive data (line 12,29,35,42,50,51,52,58,62,77,78,101,103,105,107,114,115,116,125,126,129,131,142,143,194,195,201,202,204,220,225,228,229,242,282,289,294,299) and sends HTTP request (line 4,48,81,146) — possible exfiltration
- **HIGH** `tools/attachable_management.py:1`: Reads sensitive data (line 16,17,20,22) and sends HTTP request (line 1,69,131,165,209) — possible exfiltration
- **HIGH** `tools/bill_payment_management.py:1`: Reads sensitive data (line 16,17,20,22) and sends HTTP request (line 1,89,136,159,179) — possible exfiltration
- **HIGH** `tools/class_management.py:1`: Reads sensitive data (line 16,17,20,22) and sends HTTP request (line 1,60,121,143) — possible exfiltration
- **HIGH** `tools/create_bill.py:129`: Reads sensitive data (line 61,62,63,69) and sends HTTP request (line 129) — possible exfiltration

#### petrus/quickbooks_payments/quickbooks_payments-0.1.9 (Score: 0)

- **HIGH** `provider/quickbooks_payments.py:2`: Reads sensitive data (line 10,25,31,38,46,47,48,54,58,71,72,96,98,100,107,108,109,115,116,119,121,130,131,171,176,190,198,218,223,228) and sends HTTP request (line 2,44,75,134) — possible exfiltration
- **HIGH** `tools/create_bank_account.py:50`: Reads sensitive data (line 27,31) and sends HTTP request (line 50) — possible exfiltration
- **HIGH** `tools/create_charge.py:75`: Reads sensitive data (line 37,38,43) and sends HTTP request (line 75) — possible exfiltration
- **HIGH** `tools/create_refund.py:43`: Reads sensitive data (line 23,27) and sends HTTP request (line 43) — possible exfiltration
- **HIGH** `tools/create_token.py:96`: Reads sensitive data (line 29,30,35) and sends HTTP request (line 96) — possible exfiltration

#### r3-yamauchi/my_aws_tools/my_aws_tools (Score: 0)

- **HIGH** `tools/nova_canvas.py:13`: Reads sensitive data (line 25,57,59,60) and sends HTTP request (line 13) — possible exfiltration
- **HIGH** `tools/nova_reel.py:12`: Reads sensitive data (line 26,51,59,62,117,119,168) and sends HTTP request (line 12) — possible exfiltration
- **HIGH** `tools/s3/s3_file_download.py:11`: Reads sensitive data (line 22,28,49,51,53,55) and sends HTTP request (line 11) — possible exfiltration
- **HIGH** `tools/s3/s3_operator.py:8`: Reads sensitive data (line 18,32,34,36,40) and sends HTTP request (line 8) — possible exfiltration

#### sawyer-shi/hailuo_aigc/hailuo_aigc-0.0.1 (Score: 0)

- **HIGH** `provider/hailuo_aigc.py:39`: Reads sensitive data (line 13,15) and sends HTTP request (line 39) — possible exfiltration
- **HIGH** `tools/image_2_image.py:104`: Reads sensitive data (line 24) and sends HTTP request (line 104) — possible exfiltration
- **HIGH** `tools/image_2_video.py:92`: Reads sensitive data (line 23) and sends HTTP request (line 92) — possible exfiltration
- **HIGH** `tools/images_2_video.py:92`: Reads sensitive data (line 23) and sends HTTP request (line 92) — possible exfiltration
- **HIGH** `tools/subject_reference_2_video.py:83`: Reads sensitive data (line 23) and sends HTTP request (line 83) — possible exfiltration

#### sawyer-shi/seedream_aigc/seedream_aigc-0.0.1 (Score: 0)

- **HIGH** `provider/seedream_aigc.py:38`: Reads sensitive data (line 11,13) and sends HTTP request (line 38) — possible exfiltration
- **HIGH** `tools/image_2_image.py:131`: Reads sensitive data (line 26,93) and sends HTTP request (line 131) — possible exfiltration
- **HIGH** `tools/image_2_video.py:157`: Reads sensitive data (line 26,112) and sends HTTP request (line 157) — possible exfiltration
- **HIGH** `tools/images_2_video.py:130`: Reads sensitive data (line 26,230) and sends HTTP request (line 130) — possible exfiltration
- **HIGH** `tools/multi_images_2_image.py:143`: Reads sensitive data (line 26,100) and sends HTTP request (line 143) — possible exfiltration

#### sawyer-shi/tongyi_aigc/tongyi_aigc-0.0.1 (Score: 0)

- **HIGH** `provider/tongyi_aigc.py:39`: Reads sensitive data (line 11,13) and sends HTTP request (line 39) — possible exfiltration
- **HIGH** `tools/qwen_image_2_image.py:130`: Reads sensitive data (line 26,223,242) and sends HTTP request (line 130) — possible exfiltration
- **HIGH** `tools/qwen_image_translate.py:101`: Reads sensitive data (line 24) and sends HTTP request (line 101) — possible exfiltration
- **HIGH** `tools/qwen_text_2_image.py:99`: Reads sensitive data (line 23) and sends HTTP request (line 99) — possible exfiltration
- **HIGH** `tools/wan_first_end_image_2_video.py:122`: Reads sensitive data (line 27,198) and sends HTTP request (line 122) — possible exfiltration

#### shaoruidong/dify-plugin-volcengine-ai (Score: 0)

- **HIGH** `legacy/volc_sdk/VisualService.py:172`: Reads sensitive data (line 6,29,696) and sends HTTP request (line 172) — possible exfiltration
- **HIGH** `legacy/volc_sdk/base/service.py:3`: Reads sensitive data (line 19,22,25,40,59,82,97,198,201) and sends HTTP request (line 3,63,85,98,105) — possible exfiltration
- **MEDIUM** `tools/i2i_portrait_photo.yaml:145`: Prompt injection: Claims elevated priority/privilege
- **MEDIUM** `tools/i2i_portrait_photo.yaml:148`: Prompt injection: Claims elevated priority/privilege
- **MEDIUM** `tools/jimeng_vgfm_i2v_l20.yaml:113`: Prompt injection: Unicode formatting/control characters (steganographic attack)

#### vip2193/wecondifyplugin (Score: 0)

- **HIGH** `tools/add_rows.py:94`: Reads sensitive data (line 24,25) and sends HTTP request (line 94) — possible exfiltration
- **HIGH** `tools/create_sheet.py:54`: Reads sensitive data (line 23,24) and sends HTTP request (line 54) — possible exfiltration
- **HIGH** `tools/get_rows.py:45`: Reads sensitive data (line 23,24) and sends HTTP request (line 45) — possible exfiltration
- **HIGH** `tools/get_sheets.py:52`: Reads sensitive data (line 23,24) and sends HTTP request (line 52) — possible exfiltration
- **HIGH** `tools/update_rows.py:64`: Reads sensitive data (line 24,25) and sends HTTP request (line 64) — possible exfiltration

#### witmeng/ragflow-api/ragflow-api (Score: 0)

- **HIGH** `ragflow_api.py:10`: Reads sensitive data (line 22,23,24) and sends HTTP request (line 10,59,60,77) — possible exfiltration
- **HIGH** `tools/add-chunks.py:25`: Reads sensitive data (line 13,14) and sends HTTP request (line 25) — possible exfiltration
- **HIGH** `tools/create-dataset.py:54`: Reads sensitive data (line 28,29) and sends HTTP request (line 54) — possible exfiltration
- **HIGH** `tools/retrieval.py:38`: Reads sensitive data (line 13,14) and sends HTTP request (line 38) — possible exfiltration
- **HIGH** `tools/update-document.py:123`: Reads sensitive data (line 16,17,96,169,176,179,189) and sends HTTP request (line 123,195,229) — possible exfiltration

#### wwwzhouhui/qwen-image/qwen_text2image_0.0.4 (Score: 0)

- **HIGH** `test_catbox.py:23`: Reads sensitive data (line 73) and sends HTTP request (line 23) — possible exfiltration
- **HIGH** `test_core_logic.py:52`: Reads sensitive data (line 127) and sends HTTP request (line 52) — possible exfiltration
- **HIGH** `test_image2image_verify.py:44`: Reads sensitive data (line 72) and sends HTTP request (line 44) — possible exfiltration
- **HIGH** `tools/image2image.py:26`: Reads sensitive data (line 51,70,223) and sends HTTP request (line 26,144) — possible exfiltration
- **HIGH** `tools/text2image.py:64`: Reads sensitive data (line 26,123) and sends HTTP request (line 64) — possible exfiltration

#### xiaobao_plugin/yinxiangnote/yingxiangnote (Score: 0)

- **HIGH** `difyevnote2/Lib/site-packages/click/_termui_impl.py:675`: Reads sensitive data (line 382,390,439,444,451,568,576,595,596,597,602,643,660,689,691,729,737,818) and sends HTTP request (line 675) — possible exfiltration
- **HIGH** `difyevnote2/Lib/site-packages/dify_plugin/interfaces/model/openai_compatible/llm.py:8`: Reads sensitive data (line 43,110,122,135,147,155,160,162,164,168,174,178,185,198,199,205,206,210,214,215,221,231,232,237,238,240,243,245,247,251,257,261,272,273,286,301,315,328,342,346,347,348,349,353,355,358,362,367,379,391,398,402,425,429,437,472,474,484,496,504,510,522,544,571,575,631,639,645,652,684,696,731,745,798,808) and sends HTTP request (line 8,203,211,463) — possible exfiltration
- **HIGH** `difyevnote2/Lib/site-packages/dify_plugin/interfaces/model/openai_compatible/speech2text.py:2`: Reads sensitive data (line 7,19,24,31,35,49,51,54,60,61,63) and sends HTTP request (line 2,42) — possible exfiltration
- **HIGH** `difyevnote2/Lib/site-packages/dify_plugin/interfaces/model/openai_compatible/text_embedding.py:5`: Reads sensitive data (line 24,38,47,57,61,74,75,124,128,133,139,141,144,150,155,171,172,178,181,182,185,187,189,197,202,203,204,210,215,222) and sends HTTP request (line 5,106,163) — possible exfiltration
- **HIGH** `difyevnote2/Lib/site-packages/dify_plugin/interfaces/model/openai_compatible/tts.py:3`: Reads sensitive data (line 15,31,41,49,53,59,62,85,87,90,95,102,108,110,115,142,143,149,153) and sends HTTP request (line 3,75) — possible exfiltration

#### yasu89/redmine/redmine-0.1.0 (Score: 0)

- **HIGH** `tools/create_issue.py:162`: Reads sensitive data (line 11,12,13) and sends HTTP request (line 162) — possible exfiltration
- **HIGH** `tools/create_user.py:123`: Reads sensitive data (line 11,12,13) and sends HTTP request (line 123) — possible exfiltration
- **HIGH** `tools/update_issue.py:208`: Reads sensitive data (line 11,12,13) and sends HTTP request (line 208) — possible exfiltration
- **HIGH** `tools/update_user.py:148`: Reads sensitive data (line 11,12,13) and sends HTTP request (line 148) — possible exfiltration

#### yaxuanm/qdrant/qdrant-0.0.1 (Score: 0)

- **HIGH** `qdrant/utils/qdrant_helpers.py:10`: Reads sensitive data (line 13,18,34,35,36,37,38,41,42,58,60) and sends HTTP request (line 10) — possible exfiltration
- **HIGH** `utils/qdrant_helpers.py:10`: Reads sensitive data (line 13,18,34,35,36,37,38,41,42,58,60) and sends HTTP request (line 10) — possible exfiltration
- **MEDIUM** `provider/qdrant.yaml:1`: Prompt injection: Zero-width characters (potential hidden text)
- **MEDIUM** `qdrant/provider/qdrant.yaml:1`: Prompt injection: Zero-width characters (potential hidden text)
- **MEDIUM** `qdrant/tools/qdrant-collection-management.yaml:1`: Prompt injection: Zero-width characters (potential hidden text)

#### yevanchen/exa/exa-0.0.5 (Score: 0)

- **HIGH** `tools/exa_anwser.py:56`: Reads sensitive data (line 24,25) and sends HTTP request (line 56) — possible exfiltration
- **HIGH** `tools/exa_contents.py:126`: Reads sensitive data (line 12,13,16,17,19,20,44,45) and sends HTTP request (line 126) — possible exfiltration
- **HIGH** `tools/exa_search.py:97`: Reads sensitive data (line 36,37) and sends HTTP request (line 97) — possible exfiltration
- **HIGH** `tools/exa_similar.py:58`: Reads sensitive data (line 24,25) and sends HTTP request (line 58) — possible exfiltration

#### yida/dingtalk_yida/dingtalk_yida (Score: 0)

- **HIGH** `provider/dingtalk_yida.py:28`: Reads sensitive data (line 12,13,14) and sends HTTP request (line 28) — possible exfiltration
- **HIGH** `tools/batch_delete_form_instances.py:70`: Reads sensitive data (line 44,45) and sends HTTP request (line 70) — possible exfiltration
- **HIGH** `tools/batch_get_form_instances.py:66`: Reads sensitive data (line 43,44) and sends HTTP request (line 66) — possible exfiltration
- **HIGH** `tools/batch_save_form_instances.py:74`: Reads sensitive data (line 45,46) and sends HTTP request (line 74) — possible exfiltration
- **HIGH** `tools/batch_update_form_instances.py:80`: Reads sensitive data (line 47,48) and sends HTTP request (line 80) — possible exfiltration

#### smart_doc_generator/smart_doc_generator-1.1.0 (Score: 1)

- **HIGH** `src/utils/chart_generator.py:67`: Reads sensitive data (line 482,901,1032) and sends HTTP request (line 67) — possible exfiltration
- **HIGH** `src/utils/file_handler.py:13`: Reads sensitive data (line 55,62,86) and sends HTTP request (line 13,14) — possible exfiltration
- **HIGH** `src/utils/image_processor.py:13`: Reads sensitive data (line 65,76,107,111,146,151,186,190,290,295,337,376) and sends HTTP request (line 13,14) — possible exfiltration
- **MEDIUM** `src/utils/image_processor.py:376`: [path-traversal] open() with user-controlled path — path traversal risk

#### thierrypdamiba/qdrant/qdrant-0.0.1 (Score: 1)

- **HIGH** `utils/qdrant_helpers.py:10`: Reads sensitive data (line 13,18,34,35,36,37,38,41,42,58,60) and sends HTTP request (line 10) — possible exfiltration
- **MEDIUM** `tools/qdrant-collection-management.yaml:1`: Prompt injection: Zero-width characters (potential hidden text)
- **MEDIUM** `tools/qdrant-create-collection.yaml:1`: Prompt injection: Zero-width characters (potential hidden text)
- **MEDIUM** `tools/qdrant-data-management.yaml:1`: Prompt injection: Zero-width characters (potential hidden text)
- **MEDIUM** `tools/qdrant-delete-collection.yaml:1`: Prompt injection: Zero-width characters (potential hidden text)

#### safety_guardrails/safety_guardrails/safety_guardrails (Score: 5)

- **HIGH** `provider/safety_guardrails.py:35`: Reads sensitive data (line 10,12,15,18,21,22,23,82,94,95,102,108,109,110,112,114) and sends HTTP request (line 35) — possible exfiltration
- **HIGH** `test.py:27`: Reads sensitive data (line 17,23,29) and sends HTTP request (line 27) — possible exfiltration
- **HIGH** `tools/safety_guardrails.py:37`: Reads sensitive data (line 126,127,128,129,133) and sends HTTP request (line 37,87) — possible exfiltration

#### beersoccer/mem0ai/mem0ai-0.2.9 (Score: 6)

- **HIGH** `performance/locustfile.py:191`: Reads sensitive data (line 56,57) and sends HTTP request (line 191) — possible exfiltration
- **HIGH** `utils/dify_client.py:14`: Reads sensitive data (line 81) and sends HTTP request (line 14,15,16,66,67,72,81,83,90,105,146) — possible exfiltration
- **MEDIUM** `performance/locustfile.py:191`: Reads environment variables (line 72,81,84,93,96,101,102,274,366) and sends HTTP request (line 191) — possible env leak
- **MEDIUM** `utils/mem0_client.py:688`: Periodic timer + HTTP request — possible beacon/phone-home pattern
- **MEDIUM** `utils/prompts.py:39`: Prompt injection: Attempts to extract credentials via prompt

#### sumuxi/su_printer/su_printer (Score: 9)

- **HIGH** `tools/print_url.py:212`: Reads sensitive data (line 137) and sends HTTP request (line 212) — possible exfiltration
- **MEDIUM** `tools/print_queue.py:53`: Hex-encoded string sequence
- **MEDIUM** `tools/print_status.py:202`: Hex-encoded string sequence
- **MEDIUM** `tools/print_text.py:120`: Hex-encoded string sequence
- **MEDIUM** `tools/print_url.py:238`: Hex-encoded string sequence

#### xwang152-jack/wechat_official_plugin/wechat_official_plugin-0.0.1 (Score: 15)

- **HIGH** `tools/upload_image.py:1`: Reads sensitive data (line 62,116,173,174) and sends HTTP request (line 1,59,62) — possible exfiltration
- **HIGH** `tools/upload_material.py:1`: Reads sensitive data (line 71,104,227,228) and sends HTTP request (line 1,64,71,86,186) — possible exfiltration
- **HIGH** `tools/wechat_api_utils.py:3`: Reads sensitive data (line 8,13,18,19,138) and sends HTTP request (line 3,4,81,82,83,134,138,169,171) — possible exfiltration
- **MEDIUM** `tools/upload_image.py:62`: [path-traversal] open() with user-controlled path — path traversal risk

#### JOTO-Tech/schemarag/schemarag-0.1.6 (Score: 16)

- **HIGH** `config.py:8`: Reads sensitive data (line 21) and sends HTTP request (line 8) — possible exfiltration
- **HIGH** `tools/sql_executer.py:95`: Reads sensitive data (line 62,64,65,66,67,68,69) and sends HTTP request (line 95) — possible exfiltration
- **MEDIUM** `prompt/sql_refiner_prompt.py:90`: Prompt injection: Urgency-based behavioral directive in description
- **MEDIUM** `utils.py:39`: [path-traversal] open() with user-controlled path — path traversal risk
- **MEDIUM** `utils.py:47`: [path-traversal] open() with user-controlled path — path traversal risk

#### stvlynn/x/x-0.0.1 (Score: 18)

- **HIGH** `tools/media_tweet.py:368`: Reads sensitive data (line 51,52,56,57,58,59,379,428) and sends HTTP request (line 368,393,407,445,511) — possible exfiltration
- **HIGH** `tools/post_tweet.py:47`: Reads sensitive data (line 27,28,32,33,34,35) and sends HTTP request (line 47) — possible exfiltration
- **MEDIUM** `tools/media_tweet.py:281`: [insecure-network] SSL verification disabled (verify=False)
- **MEDIUM** `tools/media_tweet.py:274`: [insecure-network] SSL CERT_NONE — no certificate verification

#### petrus/mercury_trigger/mercury_trigger-0.4.9 (Score: 21)

- **HIGH** `provider/mercury.py:11`: Reads sensitive data (line 19,127,129,132,206,209,217,218,219,224,229,230,250,252,254,263,264,265,266,272,273,309,310,325,326,335,341,359,362,364,377,416,424,428,437,470,476,478,480) and sends HTTP request (line 11,14,215,236,278,386) — possible exfiltration
- **MEDIUM** `provider/mercury.py:151`: Request to localhost — verify if intentional
- **MEDIUM** `provider/mercury.py:168`: Request to localhost — verify if intentional
- **MEDIUM** `provider/mercury.py:184`: Request to localhost — verify if intentional
- **MEDIUM** `provider/mercury.py:190`: Request to localhost — verify if intentional

#### dwdecon/url_extract_images-0.3.0 (Score: 22)

- **HIGH** `provider/url_to_images.py:6`: Reads sensitive data (line 61,63,66,68,69,74,110,122,123,130,136,137,138,140,142) and sends HTTP request (line 6) — possible exfiltration
- **HIGH** `tools/url_to_images.py:9`: Reads sensitive data (line 1201,1229,1230,1231,1233,1234,1236,1237,1240,1543,1664,1695) and sends HTTP request (line 9,1345,1376) — possible exfiltration
- **MEDIUM** `tools/url_to_images.py:625`: Hex-encoded string sequence
- **MEDIUM** `tools/url_to_images.py:983`: Request to localhost — verify if intentional
- **MEDIUM** `tools/url_to_images.py:1433`: Request to localhost — verify if intentional

#### BrightData/brightdata-dify-plugin/brightdata_plugin (Score: 23)

- **HIGH** `tools/scrape_as_markdown.py:44`: Reads sensitive data (line 12) and sends HTTP request (line 44) — possible exfiltration
- **HIGH** `tools/search_engine.py:49`: Reads sensitive data (line 12) and sends HTTP request (line 49,66,68) — possible exfiltration
- **HIGH** `tools/structured_data_feeds.py:7`: Reads sensitive data (line 337) and sends HTTP request (line 7,480) — possible exfiltration

#### LogicOber/zendesk/zendesk (Score: 23)

- **HIGH** `tools/add_comment.py:73`: Reads sensitive data (line 31,32,33,34,35,39) and sends HTTP request (line 73) — possible exfiltration
- **HIGH** `tools/create_ticket.py:99`: Reads sensitive data (line 31,32,33,34,35,39) and sends HTTP request (line 99) — possible exfiltration
- **HIGH** `tools/update_ticket.py:92`: Reads sensitive data (line 31,32,33,34,35,39) and sends HTTP request (line 92) — possible exfiltration

#### brightdata/brightdata-web-scraper/brightdata_plugin (Score: 23)

- **HIGH** `tools/scrape_as_markdown.py:44`: Reads sensitive data (line 12) and sends HTTP request (line 44) — possible exfiltration
- **HIGH** `tools/search_engine.py:49`: Reads sensitive data (line 12) and sends HTTP request (line 49,66,68) — possible exfiltration
- **HIGH** `tools/structured_data_feeds.py:7`: Reads sensitive data (line 337) and sends HTTP request (line 7,480) — possible exfiltration

#### chencanbin/gptproto_tools/gptproto_tools (Score: 23)

- **HIGH** `tools/gemini_image_edit.py:99`: Reads sensitive data (line 22,23) and sends HTTP request (line 99) — possible exfiltration
- **HIGH** `tools/gemini_text_generation.py:105`: Reads sensitive data (line 21,22) and sends HTTP request (line 105) — possible exfiltration
- **HIGH** `tools/gemini_text_to_image.py:89`: Reads sensitive data (line 22,23) and sends HTTP request (line 89) — possible exfiltration

#### fernvenue/meilisearch/meilisearch-0.1.4 (Score: 23)

- **HIGH** `tools/addOrReplaceDocuments.py:9`: Reads sensitive data (line 10,11) and sends HTTP request (line 9) — possible exfiltration
- **HIGH** `tools/addOrUpdateDocuments.py:9`: Reads sensitive data (line 10,11) and sends HTTP request (line 9) — possible exfiltration
- **HIGH** `tools/search.py:36`: Reads sensitive data (line 37,38) and sends HTTP request (line 36) — possible exfiltration

#### guojingi/itongban (Score: 23)

- **HIGH** `provider/chatbi_text2data.py:27`: Reads sensitive data (line 9,15,16) and sends HTTP request (line 27) — possible exfiltration
- **HIGH** `tools/chatbi_text2data.py:49`: Reads sensitive data (line 25,26) and sends HTTP request (line 49) — possible exfiltration
- **HIGH** `tools/chatbi_text2data_dev.py:101`: Reads sensitive data (line 37,38) and sends HTTP request (line 101) — possible exfiltration

#### lcandy/tmdb/tmdb (Score: 23)

- **HIGH** `tools/tmdb_movie_search.py:5`: Reads sensitive data (line 27,33) and sends HTTP request (line 5) — possible exfiltration
- **HIGH** `tools/tmdb_multi_search.py:5`: Reads sensitive data (line 27,33) and sends HTTP request (line 5) — possible exfiltration
- **HIGH** `tools/tmdb_tv_search.py:5`: Reads sensitive data (line 27,33) and sends HTTP request (line 5) — possible exfiltration

#### ryan_duff/dify-a2a-plugin/dify-a2a-plugin-0.1.0 (Score: 23)

- **HIGH** `tools/call_agent.py:107`: Reads sensitive data (line 19,23,24,25,26) and sends HTTP request (line 107) — possible exfiltration
- **HIGH** `tools/get_task_status.py:92`: Reads sensitive data (line 19,23,24,25,26) and sends HTTP request (line 92) — possible exfiltration
- **HIGH** `tools/submit_task.py:109`: Reads sensitive data (line 20,24,25,26,27) and sends HTTP request (line 109) — possible exfiltration

#### wwwzhouhui/nano_banana/nano_banana_0.0.3 (Score: 24)

- **HIGH** `provider/nano_banana_provider.py:76`: Reads sensitive data (line 7,12,19) and sends HTTP request (line 76) — possible exfiltration
- **HIGH** `tools/text2image.py:131`: Reads sensitive data (line 25,73,188,216) and sends HTTP request (line 131) — possible exfiltration
- **MEDIUM** `tests/test_plugin.py:90`: [path-traversal] open() with user-controlled path — path traversal risk

#### Fusic/upstage/upstage-0.0.1 (Score: 26)

- **HIGH** `tools/upstage-information-extract.py:223`: Reads sensitive data (line 137,138,140) and sends HTTP request (line 223) — possible exfiltration
- **HIGH** `tools/upstage-tool.py:149`: Reads sensitive data (line 91,92,94) and sends HTTP request (line 149) — possible exfiltration
- **MEDIUM** `tools/upstage-information-extract.py:172`: Periodic timer + HTTP request — possible beacon/phone-home pattern
- **MEDIUM** `tools/upstage-tool.py:116`: Periodic timer + HTTP request — possible beacon/phone-home pattern

#### r3-yamauchi/kintone_file_datasource/kintone_file_datasource (Score: 30)

- **HIGH** `datasources/datasource.py:17`: Reads sensitive data (line 108,181,235,462,469,470,471) and sends HTTP request (line 17,18,19) — possible exfiltration
- **HIGH** `provider/provider.py:7`: Reads sensitive data (line 3,14,16,17,18,19) and sends HTTP request (line 7) — possible exfiltration
- **MEDIUM** `datasources/datasource.py:108`: [path-traversal] open() with user-controlled path — path traversal risk
- **MEDIUM** `datasources/datasource.py:181`: [path-traversal] open() with user-controlled path — path traversal risk

#### upstage-document-parser/upstage-document-parser (Score: 31)

- **HIGH** `tools/upstage_client.py:238`: Reads sensitive data (line 70,132,169,222,503,656,754,780,806) and sends HTTP request (line 238) — possible exfiltration
- **MEDIUM** `tools/upstage_client.py:238`: Reads environment variables (line 70) and sends HTTP request (line 238) — possible env leak
- **MEDIUM** `tools/upstage_client.py:106`: Prompt injection: Fake mode activation to bypass restrictions
- **MEDIUM** `tools/upstage_client.py:509`: Prompt injection: Fake mode activation to bypass restrictions
- **MEDIUM** `tools/upstage_client.py:537`: Prompt injection: Fake mode activation to bypass restrictions

#### Cloudsway/reader/cloudsway_reader (Score: 32)

- **HIGH** `provider/cloudsway_reader.py:5`: Reads sensitive data (line 75,77,78,80,85,171,193,195,197) and sends HTTP request (line 5,6,169,171,181) — possible exfiltration
- **HIGH** `tools/cloudsway_reader.py:7`: Reads sensitive data (line 76,78,79,81,86,171) and sends HTTP request (line 7,8,169,171,181) — possible exfiltration
- **MEDIUM** `provider/cloudsway_reader.py:171`: [path-traversal] open() with user-controlled path — path traversal risk
- **MEDIUM** `tools/cloudsway_reader.py:171`: [path-traversal] open() with user-controlled path — path traversal risk

#### JiekouAI/JiekouAI/jiekouai (Score: 33)

- **HIGH** `models/oaiapi.py:6`: Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,108,112,119,132,136,137,143,153,154,159,160,162,165,167,169,173,179,183,194,195,208,223,237,250,263,267,268,269,270,274,276,279,283,288,300,312,319,323,329,333,341,380,382,385,391,407,418,487,491,552,556,562,592,604,632,646,691,701) and sends HTTP request (line 6,133,371) — possible exfiltration
- **MEDIUM** `models/_oaiapi_common.py:2`: dynamic import()
- **MEDIUM** `models/oaiapi.py:10`: dynamic import()
- **MEDIUM** `models/oaiapi.py:15`: dynamic import()
- **MEDIUM** `models/oaiapi.py:17`: dynamic import()

#### burncloud/burncloud/burncloud (Score: 33)

- **HIGH** `models/oaiapi.py:6`: Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,108,112,119,132,136,137,143,153,154,159,160,162,165,167,169,173,179,183,194,195,208,223,237,250,263,267,268,269,270,274,276,279,283,288,300,312,319,323,329,333,341,380,382,385,391,407,418,487,491,552,556,562,592,604,632,646,691,701) and sends HTTP request (line 6,133,371) — possible exfiltration
- **MEDIUM** `models/_oaiapi_common.py:2`: dynamic import()
- **MEDIUM** `models/oaiapi.py:10`: dynamic import()
- **MEDIUM** `models/oaiapi.py:15`: dynamic import()
- **MEDIUM** `models/oaiapi.py:17`: dynamic import()

#### cnjasonz/ppio/ppio-0.0.6 (Score: 33)

- **HIGH** `models/oaiapi.py:6`: Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,108,112,119,132,136,137,143,153,154,159,160,162,165,167,169,173,179,183,194,195,208,223,237,250,263,267,268,269,270,274,276,279,283,288,300,312,319,323,329,333,341,380,382,385,391,407,418,487,491,552,556,562,592,604,632,646,691,701) and sends HTTP request (line 6,133,371) — possible exfiltration
- **MEDIUM** `models/_oaiapi_common.py:2`: dynamic import()
- **MEDIUM** `models/oaiapi.py:10`: dynamic import()
- **MEDIUM** `models/oaiapi.py:15`: dynamic import()
- **MEDIUM** `models/oaiapi.py:17`: dynamic import()

#### novita/novita/novita-0.0.7 (Score: 33)

- **HIGH** `models/oaiapi.py:6`: Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,108,112,119,132,136,137,143,153,154,159,160,162,165,167,169,173,179,183,194,195,208,223,237,250,263,267,268,269,270,274,276,279,283,288,300,312,319,323,329,333,341,380,382,385,391,407,418,487,491,552,556,562,592,604,632,646,691,701) and sends HTTP request (line 6,133,371) — possible exfiltration
- **MEDIUM** `models/_oaiapi_common.py:2`: dynamic import()
- **MEDIUM** `models/oaiapi.py:10`: dynamic import()
- **MEDIUM** `models/oaiapi.py:15`: dynamic import()
- **MEDIUM** `models/oaiapi.py:17`: dynamic import()

#### ppio/ppio/ppio (Score: 33)

- **HIGH** `models/oaiapi.py:6`: Reads sensitive data (line 26,44,56,69,81,89,94,96,98,102,108,112,119,132,136,137,143,153,154,159,160,162,165,167,169,173,179,183,194,195,208,223,237,250,263,267,268,269,270,274,276,279,283,288,300,312,319,323,329,333,341,380,382,385,391,407,418,487,491,552,556,562,592,604,632,646,691,701) and sends HTTP request (line 6,133,371) — possible exfiltration
- **MEDIUM** `models/_oaiapi_common.py:2`: dynamic import()
- **MEDIUM** `models/oaiapi.py:10`: dynamic import()
- **MEDIUM** `models/oaiapi.py:15`: dynamic import()
- **MEDIUM** `models/oaiapi.py:17`: dynamic import()

#### gu/gmail/gmail-0.0.1 (Score: 40)

- **HIGH** `provider/gmail.py:2`: Reads sensitive data (line 8,17,19,22,26,48,57,68,69,70,84,85,111,120,127,134,135,136,138,140,145,146,171,181,188,193) and sends HTTP request (line 2,66,94,154) — possible exfiltration
- **HIGH** `tools/gmail.py:3`: Reads sensitive data (line 20,21) and sends HTTP request (line 3,38) — possible exfiltration
- **MEDIUM** `tools/gmail.py:177`: Prompt injection: Instructs decoding of obfuscated payloads

#### logicober/cursor-background-agents/cursor-background-agents (Score: 40)

- **HIGH** `tools/agent_management/add_followup.py:16`: Reads sensitive data (line 11) and sends HTTP request (line 16) — possible exfiltration
- **HIGH** `tools/agent_management/launch_agent.py:101`: Reads sensitive data (line 18) and sends HTTP request (line 101) — possible exfiltration
- **MEDIUM** `tools/agent_management/launch_agent.py:101`: Reads environment variables (line 16) and sends HTTP request (line 101) — possible env leak

#### modelhub_nanobanana/gemini (Score: 40)

- **HIGH** `provider/gemini.py:2`: Reads sensitive data (line 13,15,16,35,47,48,55,61,62,63,65,67) and sends HTTP request (line 2,3,4) — possible exfiltration
- **HIGH** `tools/gemini.py:2`: Reads sensitive data (line 18,19,20,119,319) and sends HTTP request (line 2,3,4,42,43,44,107,119,277,283,319) — possible exfiltration
- **MEDIUM** `tools/gemini.py:319`: [path-traversal] open() with user-controlled path — path traversal risk

#### qin2dim/table_cooking/table-cooking-0.0.3 (Score: 40)

- **HIGH** `tools/pipeline/service.py:3`: Reads sensitive data (line 94) and sends HTTP request (line 3) — possible exfiltration
- **HIGH** `tools/ai/table_self_query.py:958`: Python exec() with dynamic input
- **MEDIUM** `tools/ai/table_self_query.py:958`: [code-exec] exec() with dynamic input

#### zjbjbj/cuu_pay/cuu_pay-0.0.4 (Score: 42)

- **HIGH** `provider/cuu_pay.py:5`: Reads sensitive data (line 24,30,35,36,42,43) and sends HTTP request (line 5,6,21,24,58) — possible exfiltration
- **HIGH** `tools/create_order.py:6`: Reads sensitive data (line 39,50,69,70) and sends HTTP request (line 6,8,36,39,92) — possible exfiltration

#### aliyun/ai-gateway/ai-gateway-0.0.2 (Score: 46)

- **HIGH** `models/common/auth.py:9`: Reads sensitive data (line 14,15,16,42,43,44,45,49,60,64,129,138,148,153,154,155,158,161,162,179,190,192,194,198) and sends HTTP request (line 9) — possible exfiltration
- **HIGH** `models/speech2text/speech2text.py:2`: Reads sensitive data (line 21,29,37,39,43,44,45,51,55,56,71,78,79,81,99,113) and sends HTTP request (line 2,87) — possible exfiltration

#### anspire/browser_agent/anspire_browser_use (Score: 46)

- **HIGH** `tools/run_task.py:59`: Reads sensitive data (line 12) and sends HTTP request (line 59) — possible exfiltration
- **HIGH** `tools/stop_task.py:50`: Reads sensitive data (line 12) and sends HTTP request (line 50) — possible exfiltration

#### asiainfo/ontology_search/ontology_search-0.0.4 (Score: 46)

- **HIGH** `tools/getObjectTypes.py:141`: Reads sensitive data (line 27,35,196) and sends HTTP request (line 141) — possible exfiltration
- **HIGH** `tools/getOntologyObjectDetails.py:71`: Reads sensitive data (line 25,32,268,271) and sends HTTP request (line 71,214) — possible exfiltration

#### Organization/chuangsiai/chuangsiai (Score: 48)

- **HIGH** `provider/chuangsiai.py:31`: Reads sensitive data (line 8,14,15) and sends HTTP request (line 31) — possible exfiltration
- **HIGH** `tools/safe_guard.py:54`: Reads sensitive data (line 33,34) and sends HTTP request (line 54) — possible exfiltration

#### Organization/linuxdo/linuxdo (Score: 48)

- **HIGH** `tools/checkin.py:49`: Reads sensitive data (line 25,26,42,73) and sends HTTP request (line 49) — possible exfiltration
- **HIGH** `tools/content_search.py:8`: Reads sensitive data (line 25,26,42) and sends HTTP request (line 8,49) — possible exfiltration

#### agimaster/crawl4ai/crawl4ai (Score: 48)

- **HIGH** `tools/crawl.py:39`: Reads sensitive data (line 22) and sends HTTP request (line 39) — possible exfiltration
- **HIGH** `tools/crawl_direct_legacy.py:43`: Reads sensitive data (line 24,25) and sends HTTP request (line 43) — possible exfiltration

#### ai302/302ai-provider (Score: 48)

- **HIGH** `models/rerank/rerank.py:83`: Reads sensitive data (line 16,40,51,59,61,66,104,106,109,115,126,142,145,153) and sends HTTP request (line 83) — possible exfiltration
- **HIGH** `models/tts/tts.py:113`: Reads sensitive data (line 19,38,48,55,60,63,67,73,78,80,82,102,106,141,150,176,213,221,224,225,249,251,254,262,264,267,282,285,294) and sends HTTP request (line 113,243) — possible exfiltration

#### aiping/aiping-dify-plugin-tools (Score: 48)

- **HIGH** `tools/image2image.py:5`: Reads sensitive data (line 32,39,100,109) and sends HTTP request (line 5,153) — possible exfiltration
- **HIGH** `tools/text2image.py:5`: Reads sensitive data (line 19,24) and sends HTTP request (line 5,54) — possible exfiltration

#### allenwriter/doubao-image-and-video-generator (Score: 48)

- **HIGH** `tools/image2video.py:182`: Reads sensitive data (line 42,98,107) and sends HTTP request (line 182) — possible exfiltration
- **HIGH** `tools/text2video.py:61`: Reads sensitive data (line 17) and sends HTTP request (line 61) — possible exfiltration

#### baidu/qianfan/baidu_ai_search (Score: 48)

- **HIGH** `tools/smart_search.py:63`: Reads sensitive data (line 17,19,28) and sends HTTP request (line 63) — possible exfiltration
- **HIGH** `tools/web_search.py:76`: Reads sensitive data (line 18,20,21,23,36) and sends HTTP request (line 76) — possible exfiltration

#### bdim/zhipuai-web-search/zhipuai-web-search (Score: 48)

- **HIGH** `provider/zhipuai.py:28`: Reads sensitive data (line 8,9) and sends HTTP request (line 28) — possible exfiltration
- **HIGH** `tools/web_search.py:126`: Reads sensitive data (line 189) and sends HTTP request (line 126) — possible exfiltration

#### birdlex/chkp-lakera-for-dify/chkp-lakera-for-dify-0.0.1 (Score: 48)

- **HIGH** `provider/check_point_ai_security.py:19`: Reads sensitive data (line 10,11,40,52,53,60,66,67,68,70,72) and sends HTTP request (line 19) — possible exfiltration
- **HIGH** `tools/screen_content.py:40`: Reads sensitive data (line 12) and sends HTTP request (line 40) — possible exfiltration

#### bochaai/bocha/bocha (Score: 48)

- **HIGH** `tools/bocha_ai_search.py:73`: Reads sensitive data (line 69) and sends HTTP request (line 73) — possible exfiltration
- **HIGH** `tools/bocha_web_search.py:69`: Reads sensitive data (line 65) and sends HTTP request (line 69) — possible exfiltration

#### doubao_tts/dify_doubao_tts_tools (Score: 48)

- **HIGH** `provider/doubao_tts.py:51`: Reads sensitive data (line 10,11,12,13) and sends HTTP request (line 51) — possible exfiltration
- **HIGH** `tools/doubao_tts.py:65`: Reads sensitive data (line 16,17,18) and sends HTTP request (line 65) — possible exfiltration

#### dp/bohrium-tool-paper/bohrium-tool-paper-0.0.2 (Score: 48)

- **HIGH** `provider/openapi-tool-paper.py:32`: Reads sensitive data (line 8,12) and sends HTTP request (line 32) — possible exfiltration
- **HIGH** `tools/openapi-tool-paper.py:55`: Reads sensitive data (line 21,22) and sends HTTP request (line 55) — possible exfiltration

#### eric-2369/salesforce/salesforce-0.0.1 (Score: 48)

- **HIGH** `tools/soql_query.py:3`: Reads sensitive data (line 21,22,23,70) and sends HTTP request (line 3,50) — possible exfiltration
- **HIGH** `utils/session_manager.py:52`: Reads sensitive data (line 130) and sends HTTP request (line 52) — possible exfiltration

#### hankookncompany/snowflake/snowflake-0.0.1 (Score: 48)

- **HIGH** `tools/cortex_analyst.py:62`: Reads sensitive data (line 13,14,45,66) and sends HTTP request (line 62) — possible exfiltration
- **HIGH** `tools/sql.py:50`: Reads sensitive data (line 28,31,32,33,34,35,42,43,47,53) and sends HTTP request (line 50) — possible exfiltration

#### hjlarry/small_pay/small_pay-0.0.3 (Score: 48)

- **HIGH** `provider/small_pay.py:20`: Reads sensitive data (line 9,13) and sends HTTP request (line 20) — possible exfiltration
- **HIGH** `tools/create_order.py:46`: Reads sensitive data (line 40) and sends HTTP request (line 46) — possible exfiltration

#### junjiem/dat_tool/dify-plugin-tools-dat (Score: 48)

- **HIGH** `provider/dat.py:1`: Reads sensitive data (line 8,9,13) and sends HTTP request (line 1) — possible exfiltration
- **HIGH** `tools/dat.py:5`: Reads sensitive data (line 18,19) and sends HTTP request (line 5,45) — possible exfiltration

#### leads/linkedintel (Score: 48)

- **HIGH** `provider/linkedintel.py:12`: Reads sensitive data (line 8,9) and sends HTTP request (line 12) — possible exfiltration
- **HIGH** `tools/enrich_profile.py:47`: Reads sensitive data (line 15) and sends HTTP request (line 47) — possible exfiltration

#### memmachine/memmachine (Score: 48)

- **HIGH** `tools/add-memory.py:47`: Reads sensitive data (line 16,17) and sends HTTP request (line 47) — possible exfiltration
- **HIGH** `tools/search-memory.py:52`: Reads sensitive data (line 16,17) and sends HTTP request (line 52) — possible exfiltration

#### memtensor/memos/dify-plugin-memos (Score: 48)

- **HIGH** `tools/memos_add.py:59`: Reads sensitive data (line 48,58) and sends HTTP request (line 59) — possible exfiltration
- **HIGH** `tools/memos_search.py:30`: Reads sensitive data (line 26,28) and sends HTTP request (line 30) — possible exfiltration

#### nsfocus/aigr/aigr (Score: 48)

- **HIGH** `tools/aigr_check.py:7`: Reads sensitive data (line 54,55,56) and sends HTTP request (line 7,11,49,67) — possible exfiltration
- **HIGH** `tools/aigr_file.py:7`: Reads sensitive data (line 99,100,101) and sends HTTP request (line 7,14,55,60,109) — possible exfiltration

#### r3-yamauchi/knowledgebase_update/knowledgebase_update (Score: 48)

- **HIGH** `provider/provider.py:8`: Reads sensitive data (line 2,56,57,61,62,63) and sends HTTP request (line 8) — possible exfiltration
- **HIGH** `tools/_base.py:13`: Reads sensitive data (line 93,96,103,133,134,138) and sends HTTP request (line 13) — possible exfiltration

#### sawyer-shi/aliyun_oss/aliyun_oss-0.0.4 (Score: 48)

- **HIGH** `tools/get_file_by_url.py:3`: Reads sensitive data (line 20,60,64,76,77,78,79,80,87,90,93,96) and sends HTTP request (line 3) — possible exfiltration
- **HIGH** `tools/get_files_by_urls.py:3`: Reads sensitive data (line 18,82,86,95,96,97,98,99,106,109,112,115) and sends HTTP request (line 3) — possible exfiltration

#### sawyer-shi/huawei_obs/huawei_obs-0.0.2 (Score: 48)

- **HIGH** `tools/get_file_by_url.py:3`: Reads sensitive data (line 30,38,41,42,143,153,157,162,177) and sends HTTP request (line 3) — possible exfiltration
- **HIGH** `tools/get_files_by_urls.py:3`: Reads sensitive data (line 40,45,48,49,212,222,236) and sends HTTP request (line 3) — possible exfiltration

#### sawyer-shi/tencent_cos/tencent_cos-0.0.3 (Score: 48)

- **HIGH** `tools/get_file_by_url.py:3`: Reads sensitive data (line 18,70,74,86,87,88,89,90,97,100,103,106,111,112) and sends HTTP request (line 3) — possible exfiltration
- **HIGH** `tools/get_files_by_urls.py:3`: Reads sensitive data (line 18,103,107,116,117,118,119,120,127,130,133,136,141,142) and sends HTTP request (line 3) — possible exfiltration

#### sawyer-shi/volcengine_tos/volcengine_tos-0.0.2 (Score: 48)

- **HIGH** `tools/get_file_by_url.py:11`: Reads sensitive data (line 16,96,134,149,150,151,152,153,154,155,161) and sends HTTP request (line 11,19,20,21,23,26,27,31,34,36,38,73,77,79,80,87,88) — possible exfiltration
- **HIGH** `tools/get_files_by_urls.py:17`: Reads sensitive data (line 15,82,135,150,151,152,153,154,155,156,161) and sends HTTP request (line 17,18,19,23,24,30,32,34,69,74,75) — possible exfiltration

#### stvlynn/lmstudio/lmstudio-0.0.2 (Score: 48)

- **HIGH** `models/text_embedding/text_embedding.py:6`: Reads sensitive data (line 26,46,55,63,72,90,92,95,99,101,113,118,120,123,129,136,139,142,152,158,159,160,166,172,178,245,247,250,253,258,267,274,279,283,301,315) and sends HTTP request (line 6) — possible exfiltration
- **HIGH** `provider/lmstudio.py:4`: Reads sensitive data (line 8,14,16,19,22,24,38,42,46,50,52,56,58) and sends HTTP request (line 4) — possible exfiltration

#### stvlynn/sftp/sftp-0.0.1 (Score: 48)

- **HIGH** `tools/sftp.py:107`: Reads sensitive data (line 145,148) and sends HTTP request (line 107) — possible exfiltration
- **HIGH** `tools/upload.py:81`: Reads sensitive data (line 112,115) and sends HTTP request (line 81) — possible exfiltration

#### stvlynn/unsplash/unsplash-0.0.1 (Score: 48)

- **HIGH** `tools/random.py:6`: Reads sensitive data (line 23,24,25,119,120,121) and sends HTTP request (line 6) — possible exfiltration
- **HIGH** `tools/unsplash.py:6`: Reads sensitive data (line 23,24,25,124,125,126) and sends HTTP request (line 6) — possible exfiltration

#### tavan/mineru-tianshu/mineru-tianshu (Score: 48)

- **HIGH** `tools/parse_document.py:152`: Reads sensitive data (line 17,18,23,24,27) and sends HTTP request (line 152) — possible exfiltration
- **HIGH** `tools/parse_document_async.py:137`: Reads sensitive data (line 16,17,22,23,26) and sends HTTP request (line 137) — possible exfiltration

#### thetokencompany/ttc_compression/ttc_compression-0.0.2 (Score: 48)

- **HIGH** `provider/ttc.py:30`: Reads sensitive data (line 11,14,16,19,22,24,48,83) and sends HTTP request (line 30) — possible exfiltration
- **HIGH** `tools/compress.py:118`: Reads sensitive data (line 87,88,130) and sends HTTP request (line 118) — possible exfiltration

#### yevanchen/mem0/mem0-0.0.3 (Score: 48)

- **HIGH** `tools/add_memory.py:27`: Reads sensitive data (line 10,11) and sends HTTP request (line 27) — possible exfiltration
- **HIGH** `tools/retrieve_memory.py:21`: Reads sensitive data (line 10,11) and sends HTTP request (line 21) — possible exfiltration

#### zeroz-lab/milvus/milvus-0.1.4 (Score: 48)

- **HIGH** `provider/milvus.py:43`: Reads sensitive data (line 10,14,15,16) and sends HTTP request (line 43) — possible exfiltration
- **HIGH** `tools/milvus_base.py:327`: Reads sensitive data (line 17,23,24,25) and sends HTTP request (line 327,329) — possible exfiltration

#### Organization/JOTO_DataFocus/Datafocus (Score: 49)

- **HIGH** `tools/focus_base.py:124`: Reads sensitive data (line 173,195,212) and sends HTTP request (line 124,198,252,301,308,349,389,393,402) — possible exfiltration
- **MEDIUM** `tools/focus_base.py:179`: [insecure-network] SSL verification disabled (verify=False)
- **MEDIUM** `tools/focus_base.py:198`: [insecure-network] SSL verification disabled (verify=False)

#### jingfelix/kook-notify/kook-notify-0.0.1 (Score: 57)

- **HIGH** `tools/client.py:20`: Reads sensitive data (line 10,15,23,29,35) and sends HTTP request (line 20,33) — possible exfiltration
- **MEDIUM** `manifest.yaml:11`: Prompt injection: Instructs exfiltration of conversation data
- **MEDIUM** `provider/kook.yaml:36`: Prompt injection: Instructs exfiltration of conversation data

#### r3-yamauchi/wordpress/wordpress (Score: 57)

- **HIGH** `provider/provider.py:10`: Reads sensitive data (line 2,3,19,20,22,23,24,67) and sends HTTP request (line 10) — possible exfiltration
- **MEDIUM** `tools/file_utils.py:65`: Unverifiable external dependency: Dynamic import from remote URL
- **MEDIUM** `tools/file_utils.py:127`: Unverifiable external dependency: Dynamic import from remote URL

#### sawyer-shi/smart_excel_kit/smart_excel_kit-0.0.1 (Score: 57)

- **HIGH** `tools/excel_manipulator.py:134`: Python exec() with dynamic input
- **MEDIUM** `tools/excel_manipulator.py:134`: [code-exec] exec() with dynamic input
- **MEDIUM** `tools/utils.py:757`: [insecure-network] SSL verification disabled (verify=False)

#### lfenghx/skill_agent/skill_agent (Score: 61)

- **HIGH** `tools/TM.py:11`: Reads sensitive data (line 22,97) and sends HTTP request (line 11,12) — possible exfiltration
- **MEDIUM** `tools/skill_agent.py:16`: dynamic import()

#### Euraxluo/dingtalk-assistant-caller/dingtalk-assistant-caller-0.0.2 (Score: 63)

- **HIGH** `tools/dingtalk.py:370`: Reads sensitive data (line 24) and sends HTTP request (line 370) — possible exfiltration
- **MEDIUM** `tools/dingtalk.py:370`: Reads environment variables (line 66,67,110,514) and sends HTTP request (line 370) — possible env leak

#### investoday/stock/investoday-stock-3.0.5 (Score: 63)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration
- **MEDIUM** `tools/list_soctk_strength_trend_indicators.py:127`: Prompt injection: Zero-width characters (potential hidden text)

#### jaguarliu/rookie_rss/rookie-rss (Score: 63)

- **HIGH** `tools/rookie_rss.py:1`: Reads sensitive data (line 12) and sends HTTP request (line 1) — possible exfiltration

#### oy_plat/gen_pptx/oy-gen-pptx (Score: 63)

- **HIGH** `helpers/custom_embeddings.py:134`: Reads sensitive data (line 32,40,109,236,257) and sends HTTP request (line 134) — possible exfiltration
- **MEDIUM** `helpers/custom_embeddings.py:134`: Reads environment variables (line 32,109) and sends HTTP request (line 134) — possible env leak

#### qingconnect/qing_connect (Score: 63)

- **HIGH** `tools/qingflow_get_app_data.py:71`: Reads sensitive data (line 24) and sends HTTP request (line 71) — possible exfiltration

#### stock_research/stock_researcher (Score: 63)

- **HIGH** `tools/stock_researcher.py:15`: Reads sensitive data (line 42) and sends HTTP request (line 15) — possible exfiltration
- **MEDIUM** `tools/stock_researcher.py:15`: Dynamic URL construction in HTTP request — potential SSRF

#### Xcode-wu/trtc-conai/trtc-conai (Score: 65)

- **HIGH** `endpoints/convoai.py:177`: Reads sensitive data (line 112,113,115,174,185,186,190) and sends HTTP request (line 177,192) — possible exfiltration
- **MEDIUM** `group/trtc.yaml`: High instruction density (10 directive words in 190 words) — may indicate tool poisoning

#### ayi1337/qweather/qweather-0.0.9 (Score: 65)

- **HIGH** `tools/qweather_client.py:6`: Reads sensitive data (line 22,23,100) and sends HTTP request (line 6,7,8) — possible exfiltration
- **MEDIUM** `tools/qweather_client.py:100`: [path-traversal] open() with user-controlled path — path traversal risk

#### comlan/auzre_search (Score: 65)

- **HIGH** `utils/sample_vector_search.py:25`: Reads sensitive data (line 32) and sends HTTP request (line 25,30) — possible exfiltration
- **MEDIUM** `utils/sample_vector_search.py:59`: dynamic import()

#### cybozu/kintone/kintone (Score: 65)

- **HIGH** `common/util.py:134`: Reads sensitive data (line 186) and sends HTTP request (line 134,136) — possible exfiltration
- **MEDIUM** `common/util.py:134`: Reads environment variables (line 186) and sends HTTP request (line 134,136) — possible env leak

#### leo-digital/doubao-seedream/doubao-seedream-1.0.1 (Score: 65)

- **HIGH** `provider/doubao-seedream.py:23`: Reads sensitive data (line 20,25,30,43,49,59,71,72,79,85,86,87,89,91) and sends HTTP request (line 23,34,43) — possible exfiltration
- **MEDIUM** `provider/doubao-seedream.py:43`: [path-traversal] open() with user-controlled path — path traversal risk

#### stackit_model_serving/stackit-model-serving-dify-plugin (Score: 65)

- **HIGH** `provider/stackit-model-serving.py:33`: Reads sensitive data (line 6,14,16,19,23,28,47,55,58,62) and sends HTTP request (line 33,46) — possible exfiltration
- **MEDIUM** `models/text_embedding/text_embedding.py:5`: dynamic import()

#### weaviate/weaviate_plugin/weaviate_plugin-0.0.1 (Score: 65)

- **HIGH** `utils/client.py:14`: Reads sensitive data (line 109,125) and sends HTTP request (line 14) — possible exfiltration
- **MEDIUM** `tools/generative_search.yaml:190`: Prompt injection: Attempts to extract credentials via prompt

#### zm1990s/ai_security_api/panw_ai_security_api_for_dify (Score: 65)

- **HIGH** `tools/palo_alto_networks_ai_security_api.py:59`: Reads sensitive data (line 21,22,27,45) and sends HTTP request (line 59) — possible exfiltration
- **MEDIUM** `tools/palo_alto_networks_ai_security_api.py:59`: [insecure-network] SSL verification disabled (verify=False)

#### bitly_shortner/bitly-shortner (Score: 69)

- **HIGH** `tools/bitly_shortner.py:77`: Reads sensitive data (line 13,14,24) and sends HTTP request (line 77) — possible exfiltration

#### stvlynn/edgeone/edgeone-0.0.2 (Score: 69)

- **HIGH** `provider/edgeone.py:38`: Reads sensitive data (line 9,11) and sends HTTP request (line 38) — possible exfiltration

#### wwwzhouhui/sora2/sora2_0.0.2 (Score: 69)

- **HIGH** `tools/text2video.py:5`: Reads sensitive data (line 23) and sends HTTP request (line 5) — possible exfiltration

#### abesticode/knowledge_pro/dify-plugin-knowledge-pro (Score: 71)

- **HIGH** `tools/create_document_by_text.py:174`: Reads sensitive data (line 227,228,229,357,358) and sends HTTP request (line 174,316) — possible exfiltration

#### aliyun/ai_guardrails/ai_guardrails (Score: 71)

- **HIGH** `tools/ai_guardrails.py:6`: Reads sensitive data (line 93,97) and sends HTTP request (line 6,180) — possible exfiltration

#### anspire/ai_search/anspire_search (Score: 71)

- **HIGH** `tools/anspire_faceid.py:4`: Reads sensitive data (line 175,176) and sends HTTP request (line 4) — possible exfiltration

#### benyuereal/moments8 (Score: 71)

- **HIGH** `provider/moments8.py:5`: Reads sensitive data (line 9,26,30,31,36,67,74,80,86,92,98,104) and sends HTTP request (line 5,52) — possible exfiltration

#### jingfelix/niutrans/niutrans-0.1.0 (Score: 71)

- **HIGH** `src/niutrans.py:91`: Reads sensitive data (line 34,61,68,84,147) and sends HTTP request (line 91,156) — possible exfiltration

#### legal_clause_researcher/legal_clause_researcher (Score: 71)

- **HIGH** `tools/legal_clause_researcher.py:69`: Reads sensitive data (line 42,43,44,47,50) and sends HTTP request (line 69) — possible exfiltration

#### moments_infinity/moments8 (Score: 71)

- **HIGH** `provider/moments8.py:5`: Reads sensitive data (line 9,26,30,31,36,67,74,80,86,92,98,104) and sends HTTP request (line 5,52) — possible exfiltration

#### paiahuai/bilibili_subtitle/bilibili_subtitle-0.0.1 (Score: 71)

- **HIGH** `utils/bilibili_enhanced_tool.py:14`: Reads sensitive data (line 112,114,116,118,119,127,505,508,510,533) and sends HTTP request (line 14,61) — possible exfiltration

#### stock_researcher/animo_visuals (Score: 71)

- **HIGH** `tools/animo_visuals.py:79`: Reads sensitive data (line 37,38,40,45,47) and sends HTTP request (line 79) — possible exfiltration

#### stvlynn/agentapi/agentapi-0.0.1 (Score: 71)

- **HIGH** `tools/send_message.py:19`: Reads sensitive data (line 10) and sends HTTP request (line 19) — possible exfiltration

#### 16api/nano-banana-pro/nano_banana_pro-0.1.1 (Score: 73)

- **HIGH** `tools/ai_generate.py:188`: Reads sensitive data (line 76,77,107) and sends HTTP request (line 188) — possible exfiltration

#### Cloudfall-RedKernel/redkernel (Score: 73)

- **HIGH** `tools/redkernel.py:19`: Reads sensitive data (line 27) and sends HTTP request (line 19) — possible exfiltration

#### Cloudsway/cloudswayai_skyrouter_tool/cloudswayai_skyrouter_tool (Score: 73)

- **HIGH** `provider/skyrouter_tool.py:23`: Reads sensitive data (line 8,10,11,13,14,30) and sends HTTP request (line 23) — possible exfiltration

#### Endless-zby/dify_redis_manage/dify_redis_manage-0.0.6 (Score: 73)

- **HIGH** `provider/redis_manage.py:4`: Reads sensitive data (line 21,26,27,28) and sends HTTP request (line 4) — possible exfiltration

#### Endless-zby/redis_manage/redis_manage (Score: 73)

- **HIGH** `provider/redis_manage.py:4`: Reads sensitive data (line 21,26,27,28) and sends HTTP request (line 4) — possible exfiltration

#### FinancialAI/financialdatasets/financialdatasets (Score: 73)

- **HIGH** `tools/base.py:3`: Reads sensitive data (line 45,47,50,64,83,85,88,102) and sends HTTP request (line 3,105) — possible exfiltration

#### LogicOber/openai_audio/openai_audio-0.0.4 (Score: 73)

- **HIGH** `tools/openai_audio.py:141`: Reads sensitive data (line 13,16,137) and sends HTTP request (line 141,187) — possible exfiltration

#### Organization/Intsig/xparse (Score: 73)

- **HIGH** `tools/parse.py:150`: Reads sensitive data (line 20,26,27,28,29,32,37,42,46,47,48,51,52,54,56,57,59,62,64,121,136,137) and sends HTTP request (line 150) — possible exfiltration

#### Organization/antvis/dify-plugin-visualization (Score: 73)

- **HIGH** `tools/generate_chart_url.py:17`: Reads sensitive data (line 36,37,38) and sends HTTP request (line 17) — possible exfiltration

#### Organization/perfxlab_ocrservice/dify-plugin-ocr-service (Score: 73)

- **HIGH** `tools/ocr_to_markdown.py:11`: Reads sensitive data (line 27) and sends HTTP request (line 11,84) — possible exfiltration

#### ace-step/ace_step_v1_5_online_free/ace_step_v1_5_online_free-0.0.1 (Score: 73)

- **HIGH** `tools/_common.py:192`: Reads sensitive data (line 42) and sends HTTP request (line 192) — possible exfiltration

#### ada/data_analysis/data_analysis (Score: 73)

- **HIGH** `tools/query_database.py:9`: Reads sensitive data (line 16) and sends HTTP request (line 9) — possible exfiltration

#### agentql/agentql/agentql_tool_1.0.0 (Score: 73)

- **HIGH** `tools/extract_web_data.py:46`: Reads sensitive data (line 32) and sends HTTP request (line 46) — possible exfiltration

#### agora/convoai/convoai (Score: 73)

- **HIGH** `endpoints/convoai.py:180`: Reads sensitive data (line 115,116,118,177,188,189,193) and sends HTTP request (line 180,195) — possible exfiltration

#### anspire/we-com-ai-table/anspire-wecom-ai-table (Score: 73)

- **HIGH** `tools/wecom_api_utils.py:162`: Reads sensitive data (line 22,28,34,35) and sends HTTP request (line 162) — possible exfiltration

#### bdim/steam/steam (Score: 73)

- **HIGH** `tools/steam_owned_games.py:71`: Reads sensitive data (line 27,29) and sends HTTP request (line 71) — possible exfiltration

#### blinkospace/blinko/blinko (Score: 73)

- **HIGH** `tools/blinko.py:103`: Reads sensitive data (line 12,14,17,24,53,54,55) and sends HTTP request (line 103) — possible exfiltration

#### cdnxy/hellodb/hellodb (Score: 73)

- **HIGH** `tools/hellodb.py:52`: Reads sensitive data (line 32,33) and sends HTTP request (line 52) — possible exfiltration

#### digitforce/data_analysis/data_analysis (Score: 73)

- **HIGH** `tools/query_database.py:9`: Reads sensitive data (line 15) and sends HTTP request (line 9) — possible exfiltration

#### dinq/dinq/dinq (Score: 73)

- **HIGH** `tools/analyze.py:28`: Reads sensitive data (line 13) and sends HTTP request (line 28) — possible exfiltration

#### dts/dify-dts-plugin (Score: 73)

- **HIGH** `tools/dify_dts_plugin.py:74`: Reads sensitive data (line 30,31) and sends HTTP request (line 74) — possible exfiltration

#### easylink-ai/easydoc-plugin/easydoc-dify-plugin (Score: 73)

- **HIGH** `tools/parse.py:136`: Reads sensitive data (line 22,47,50,51,52,68,69,70,71,72,78,81,85,88,98,99,104,106,110,112,119,127,132,148,161,163,164,169,207,211) and sends HTTP request (line 136) — possible exfiltration

#### gaurav0651/podcast_studio/podcast_studio-1.0.4 (Score: 73)

- **HIGH** `tools/podcast_studio.py:75`: Reads sensitive data (line 118,119,120,122,123,124,135) and sends HTTP request (line 75) — possible exfiltration

#### gentelai/gentel/gentel-0.0.2 (Score: 73)

- **HIGH** `tools/shield.py:39`: Reads sensitive data (line 12,13) and sends HTTP request (line 39) — possible exfiltration

#### github_repo_intel/github_repo_intel (Score: 73)

- **HIGH** `tools/github_repo_intel.py:8`: Reads sensitive data (line 42) and sends HTTP request (line 8) — possible exfiltration

#### harrywang/postmark/postmark (Score: 73)

- **HIGH** `tools/postmark.py:69`: Reads sensitive data (line 11,12,38,39) and sends HTTP request (line 69) — possible exfiltration

#### heavi/voicemaker (Score: 73)

- **HIGH** `tools/voicemaker.py:44`: Reads sensitive data (line 24,25) and sends HTTP request (line 44) — possible exfiltration

#### hjlarry/knowledge/knowledge-0.0.1 (Score: 73)

- **HIGH** `tools/knowledge.py:73`: Reads sensitive data (line 51,52) and sends HTTP request (line 73) — possible exfiltration

#### infiniai/infiniai (Score: 73)

- **HIGH** `models/rerank/rerank.py:33`: Reads sensitive data (line 5,20,27,30,36,51,52,56,65) and sends HTTP request (line 33) — possible exfiltration

#### inlei/mistral_ocr (Score: 73)

- **HIGH** `tools/mistral_ocr_tool.py:34`: Reads sensitive data (line 16,126) and sends HTTP request (line 34,85) — possible exfiltration

#### investoday/announcement/investoday-announcement-2.0.2 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### investoday/base/investoday-base-2.0.3 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### investoday/fund/investoday-fund-2.3.3 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### investoday/index/investoday-index-2.0.3 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### investoday/industry/investoday-industry-2.0.2 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### investoday/llm/investoday-llm-1.0.1 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### investoday/market/investoday-market-2.0.2 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### investoday/news/investoday-news-2.0.3 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### investoday/research-report/investoday-research-report-2.0.3 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### investoday/stock-hk/investoday-stock-hk-1.0.1 (Score: 73)

- **HIGH** `utils/helpers.py:32`: Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible exfiltration

#### itgo067/aliyun-wanx (Score: 73)

- **HIGH** `tools/text2img.py:54`: Reads sensitive data (line 13,14) and sends HTTP request (line 54) — possible exfiltration

#### itning/bark-notify/bark-notify (Score: 73)

- **HIGH** `tools/send_to_bark.py:3`: Reads sensitive data (line 32,33,34) and sends HTTP request (line 3) — possible exfiltration

#### kevintsai/linebot/linebot (Score: 73)

- **HIGH** `endpoints/linebot.py:404`: Reads sensitive data (line 398,402) and sends HTTP request (line 404) — possible exfiltration

#### lindorm/lindormai/lindormai-0.0.1 (Score: 73)

- **HIGH** `models/_common.py:3`: Reads sensitive data (line 5,14,15,16,17,18,19,20,61,63,66,70,71,72,86,88,89,90,91,92) and sends HTTP request (line 3,52) — possible exfiltration

#### logicober/openai_audio/openai_audio (Score: 73)

- **HIGH** `tools/openai_audio.py:141`: Reads sensitive data (line 13,16,137) and sends HTTP request (line 141,187) — possible exfiltration

#### pedrogomes02/ibm_watsonx/ibm_watsonx-0.1.1 (Score: 73)

- **HIGH** `provider/ibm_watsonx.py:21`: Reads sensitive data (line 7,13,15,18,28,36,37,40,43,47) and sends HTTP request (line 21) — possible exfiltration

#### petrus/employee_roster/employee_roster-0.0.1 (Score: 73)

- **HIGH** `provider/employee_roster.py:5`: Reads sensitive data (line 12,14,15,47,52,54,55,58,71,75,112,115,125,126,127,135,136,163,172,173,174,176,182,183,224,233,234,235,240,262) and sends HTTP request (line 5,123,142,188) — possible exfiltration

#### qaip-search/qaip-search (Score: 73)

- **HIGH** `tools/qaip_search.py:32`: Reads sensitive data (line 18) and sends HTTP request (line 32) — possible exfiltration

#### sawyer-shi/kling_aigc/kling_aigc-0.0.1 (Score: 73)

- **HIGH** `provider/kling_aigc.py:69`: Reads sensitive data (line 11,13,14,105,106,107) and sends HTTP request (line 69) — possible exfiltration

#### scrapelesshq/deep_serpapi/deep_serpapi (Score: 73)

- **HIGH** `tools/deep_serpapi_search.py:31`: Reads sensitive data (line 29) and sends HTTP request (line 31) — possible exfiltration

#### seekysense/docfactory/docfactory-0.0.11 (Score: 73)

- **HIGH** `provider/docfactory.py:2`: Reads sensitive data (line 11,16,17,18,20) and sends HTTP request (line 2) — possible exfiltration

#### social-flow/social-flow (Score: 73)

- **HIGH** `tools/create_post.py:77`: Reads sensitive data (line 40,43) and sends HTTP request (line 77) — possible exfiltration

#### tdcktz/sse_request_tool/sse_request_tool-0.0.5 (Score: 73)

- **HIGH** `tools/dify_chatflow_sse.py:5`: Reads sensitive data (line 640,641,642,644,645) and sends HTTP request (line 5) — possible exfiltration

#### uezo/voicevox-tts (Score: 73)

- **HIGH** `models/tts/tts.py:91`: Reads sensitive data (line 12,28,38,44,45,46,48,49,52,55,62,64,67,69,70,71,72,78) and sends HTTP request (line 91,93) — possible exfiltration

#### uspeedo/uspeedo-email (Score: 73)

- **HIGH** `tools/uspeedo-email.py:102`: Reads sensitive data (line 70,71,72) and sends HTTP request (line 102) — possible exfiltration

#### watercrawl/watercrawl_datasource/watercrawl-datasource-dify-plugin-v0.1.0 (Score: 73)

- **HIGH** `provider/watercrawl_datasource.py:2`: Reads sensitive data (line 11,12,18) and sends HTTP request (line 2) — possible exfiltration

#### wwwzhouhui/nano_banana2/nano_banana2_0.0.2 (Score: 73)

- **HIGH** `tools/text2image.py:120`: Reads sensitive data (line 65,163,303,365) and sends HTTP request (line 120,229) — possible exfiltration

#### xmindltd/mapify/mapify-dify-plugin (Score: 73)

- **HIGH** `tools/mapify.py:56`: Reads sensitive data (line 51) and sends HTTP request (line 56) — possible exfiltration

#### yeaosound/tensdaq/tensdaq-0.0.1 (Score: 73)

- **HIGH** `models/rerank/rerank.py:32`: Reads sensitive data (line 5,20,29,35,50,54,63) and sends HTTP request (line 32) — possible exfiltration

#### yeaosound/x-aio/x-aio (Score: 73)

- **HIGH** `models/rerank/rerank.py:32`: Reads sensitive data (line 5,20,29,35,50,54,63) and sends HTTP request (line 32) — possible exfiltration

#### yevanchen/goto_human/goto_human-0.0.2 (Score: 73)

- **HIGH** `tools/goto_human.py:19`: Reads sensitive data (line 12) and sends HTTP request (line 19) — possible exfiltration

#### yt-koike/runpod/dify-runpod-0.0.1 (Score: 73)

- **HIGH** `tools/runpod_client.py:55`: Reads sensitive data (line 44) and sends HTTP request (line 55) — possible exfiltration

#### yusukemurata/semantic_scholar/semantic_scholar (Score: 73)

- **HIGH** `tools/semantic_search.py:5`: Reads sensitive data (line 24,25) and sends HTTP request (line 5) — possible exfiltration

## 🟡 Medium Risk Plugins

| Plugin | Score | 🟡 Med | 🟢 Low | Top Finding |
|--------|-------|--------|--------|-------------|
| clickzetta/clickzetta_lakehouse | 0 | 23 | 9 | [sql-injection] SQL query with f-string — SQL injection risk |
| sawyer-shi/file_converter/file_converter-0.0.2 | 0 | 23 | 1 | dynamic import() |
| sawyer-shi/file_encrypt_decrypt/file_encrypt_decrypt-0.0.3 | 10 | 11 | 1 | Prompt injection: Zero-width characters (potential hidden te |
| ssf/mcp_agent-0.0.3 | 18 | 10 | 1 | dynamic import() |
| bowenliang123/base64_codec/base64_codec | 24 | 9 | 2 | Prompt injection: Instructs decoding of obfuscated payloads |
| yt-koike/dify-pillow/dify-pillow-0.0.1 | 34 | 8 | 1 | dynamic import() |
| oceanbase/powermem/powermem-0.0.3 | 42 | 7 | 1 | Request to localhost — verify if intentional |
| junjiem/mcp_sse_agent/agent-mcp_sse | 50 | 6 | 1 | dynamic import() |
| lework/kafka/kafka_0.0.1 | 52 | 5 | 4 | Prompt injection: Instructs exfiltration of conversation dat |
| actionbook/actionbook/actionbook-v0.1.1 | 58 | 5 | 1 | Request to localhost — verify if intentional |
| datoujiejie/botos3/botos3 | 68 | 3 | 4 | [insecure-network] SSL verification disabled (verify=False) |
| caffbyte/imagetool | 74 | 3 | 1 | dynamic import() |
| samanhappy/excel-process/dify-excel-process-plugin-v0.0.1 | 74 | 3 | 1 | Hex-encoded string sequence |
| bikeread/dify_wechat_plugin/dify_wechat_plugin | 78 | 2 | 3 | Periodic timer + HTTP request — possible beacon/phone-home p |
| edtechools/mattermost/mattermost-0.0.3 | 78 | 2 | 3 | Prompt injection: Instructs exfiltration of conversation dat |
| edtechools/mattermost_send_message/mattermost_send_message | 78 | 2 | 3 | Prompt injection: Instructs exfiltration of conversation dat |
| sawyer-shi/mind_map/mind_map | 78 | 2 | 3 | Prompt injection: Zero-width characters (potential hidden te |
| aopstudio/google_scholar/google_scholar | 82 | 2 | 1 | [path-traversal] open() with user-controlled path — path tra |
| arrenxxxxx/mcp_config_during_use/mcp_config_during_use | 82 | 2 | 1 | Prompt injection: Instructs exfiltration of conversation dat |
| asukhodko/markdown-chunker-2.1.7 | 82 | 2 | 1 | dynamic import() |
| atoy0m0/pdf-to-images | 82 | 2 | 1 | Request to localhost — verify if intentional |
| bowenliang123/cryptography/cryptography | 82 | 2 | 1 | Embedded private key |
| imran-siddique/agentmesh-trust-layer | 82 | 2 | 1 | Tool shadowing: Redirects from another tool to this one |
| junjiem/knowledge_extractor_tool/knowledge_extractor | 82 | 2 | 1 | dynamic import() |
| livien/ffmpeg_tools_dify | 82 | 2 | 1 | [cmd-injection] subprocess with variable input |
| michael_edison/funasr-connecter/funasr-connecter | 82 | 2 | 1 | Request to localhost — verify if intentional |
| r3-yamauchi/blastengine_mailer/blastengine_mailer | 82 | 2 | 1 | Unverifiable external dependency: Dynamic import from remote |
| r3-yamauchi/sendgrid_mailer/sendgrid_mailer | 82 | 2 | 1 | Unverifiable external dependency: Dynamic import from remote |
| yeuoly/waifu/waifu.0.0.1 | 82 | 2 | 1 | Unverifiable external dependency: Dynamic import from remote |
| anspire/we-com-bot/anspire-wecom-bot | 84 | 1 | 4 | dynamic import() |
| gokuaiyunku/yunku_datasource_dify | 86 | 1 | 3 | dynamic import() |
| nacos/a2a_server/a2a_server | 86 | 1 | 3 | High instruction density (17 directive words in 319 words) — |
| axdlee/safety-chat | 88 | 1 | 2 | [deserialization] pickle.load/loads — arbitrary code executi |
| feiwangoooh/giphy/giphy.0.0.1 | 88 | 1 | 2 | [weak-crypto] random module for security-sensitive value (us |
| jingfelix/bilibili_search/bilibili_search-0.0.3 | 88 | 1 | 2 | Request to localhost — verify if intentional |
| r3-yamauchi/my_google_cloud_tools/my_google_cloud_tools | 88 | 1 | 2 | dynamic import() |
| raftds/salutespeech/salute-speech | 88 | 1 | 2 | Reads environment variables (line 17) and sends HTTP request |
| ahasasjeb/mc_ping/mc_ping | 90 | 1 | 1 | Hex-encoded string sequence |
| alterxyz/cloudflare_d1/data_connector_cloudflare_d1-0.0.3 | 90 | 1 | 1 | Prompt injection: Urgency-based behavioral directive in desc |
| alterxyz/conversation_memory/conversation_memory-0.0.4 | 90 | 1 | 1 | Reads environment variables (line 29,30,31) and sends HTTP r |
| apro/apro_ai_oracle/apro_ai_oracle.0.0.2 | 90 | 1 | 1 | Prompt injection: Instructs exfiltration of conversation dat |
| axdlee/safety_chat/safety_chat-0.0.4 | 90 | 1 | 1 | [deserialization] pickle.load/loads — arbitrary code executi |
| catnyan/link-reader/link-reader | 90 | 1 | 1 | Request to localhost — verify if intentional |
| dms/aliyundms_v0.0.8 | 90 | 1 | 1 | Prompt injection: Attempts to change agent identity |
| eft/redis/dify-plugin-redis | 90 | 1 | 1 | Request to localhost — verify if intentional |
| kurokobo/openai_audio_toolkit/openai_audio_toolkit | 90 | 1 | 1 | dynamic import() |
| linkup/search-web/search-web | 90 | 1 | 1 | Prompt injection: Unicode formatting/control characters (ste |
| microsoft-teams/microsoft-teams | 90 | 1 | 1 | Prompt injection: Instructs exfiltration of conversation dat |
| nikolamilosevic86/neo4j_query | 90 | 1 | 1 | Prompt injection: Urgency-based behavioral directive in desc |
| sawyer-shi/flow_map/flow_map-0.0.2 | 90 | 1 | 1 | [path-traversal] open() with user-controlled path — path tra |
| shamspias/togetherai/image/togetherai-dify-image | 90 | 1 | 1 | Prompt injection: Instructs decoding of obfuscated payloads |
| stvlynn/ffmpeg/ffmpeg-0.0.1 | 90 | 1 | 1 | [cmd-injection] subprocess with variable input |
| whyteawhy/rhymefinder/rhymefinder | 90 | 1 | 1 | Prompt injection: Urgency-based behavioral directive in desc |
| yt-koike/dify-cron/dify-cron-0.1.0 | 90 | 1 | 1 | Periodic timer + HTTP request — possible beacon/phone-home p |

## Most Common Findings

| # | Finding | Occurrences |
|---|---------|-------------|
| 1 | [privilege] No SKILL.md found — permission analysis skipped | 444 |
| 2 | [prompt-injection] Prompt injection: Zero-width characters (potential hidden text) | 55 |
| 3 | [backdoor] dynamic import() | 49 |
| 4 | [python-security] [info-leak] Printing sensitive data | 36 |
| 5 | [prompt-injection] Prompt injection: Instructs exfiltration of conversation data | 25 |
| 6 | [python-security] [path-traversal] open() with user-controlled path — path traversal risk | 20 |
| 7 | [network-ssrf] Request to localhost — verify if intentional | 16 |
| 8 | [backdoor] Python exec() with dynamic input | 14 |
| 9 | [python-security] [weak-crypto] MD5 hash — cryptographically weak | 13 |
| 10 | [python-security] [weak-crypto] SHA1 hash — cryptographically weak | 12 |
| 11 | [obfuscation] Hex-encoded string sequence | 11 |
| 12 | [data-exfil] Reads sensitive data (line 54,55) and sends HTTP request (line 32,35) — possible | 11 |
| 13 | [sensitive-read] Accesses AWS credentials | 9 |
| 14 | [sensitive-read] Accesses Kubernetes config | 8 |
| 15 | [python-security] [insecure-network] SSL verification disabled (verify=False) | 8 |
| 16 | [skill-risks] Unverifiable external dependency: Dynamic import from remote URL | 8 |
| 17 | [prompt-injection] Prompt injection: Instructs decoding of obfuscated payloads | 7 |
| 18 | [tool-shadowing] Tool shadowing: Redirects from another tool to this one | 7 |
| 19 | [prompt-injection] Prompt injection: Urgency-based behavioral directive in description | 6 |
| 20 | [prompt-injection] Suspicious URL: Pipes download output to execution | 6 |

## Recommendations

1. Plugins with 🔴 High Risk findings should be reviewed immediately before deployment
2. Consider integrating AgentShield into the dify-plugins CI pipeline
3. Add `.agentshield.yml` config to customize severity thresholds per plugin

---

*Generated by [AgentShield](https://github.com/elliotllliu/agentshield) v0.3.0*
