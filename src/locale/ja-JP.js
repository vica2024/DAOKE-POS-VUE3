import localeMessageBox from "@/components/message-box/locale/ja-JP";
import localeLogin from "@/views/login/locale/ja-JP";
import locale403 from "@/views/exception/403/locale/ja-JP";
import locale404 from "@/views/exception/404/locale/ja-JP";
import locale500 from "@/views/exception/500/locale/ja-JP";

//for cashier language
import localeCashier from "@/views/cashier/locale/ja-JP.js";

export default {
	"user.admin": "管理者",
	"user.cashier": "レジ係",
	"menu.cashier": "販売",
	"menu.refund": "返品",
	"menu.pendingOrder": "保留",
	"menu.redeem-coupon": "引換",
	"menu.order": "注文",
	"menu.customer": "顧客",
	"menu.dashboard": "ダッシュボード",
	"menu.server.dashboard": "サーバーダッシュボード",
	"menu.server.workplace": "サーバーワークスペース",
	"menu.server.monitor": "リアルタイムモニター",
	"menu.list": "リストページ",
	"menu.result": "結果ページ",
	"menu.exception": "例外ページ",
	"menu.form": "フォームページ",
	"menu.profile": "詳細ページ",
	"menu.visualization": "データビジュアライゼーション",
	"menu.arcoWebsite": "Arco Design",
	"menu.faq": "よくある質問",
	"navbar.docs": "ドキュメントセンター",
	"navbar.action.locale": "日本語に切り替え",

	"modal.title.add": "追加",
	"modal.title.edit": "編集",
	"modal.title.view": "表示",
	"modal.footer.cancel": "キャンセル",
	"modal.footer.ok": "確認",
	"modal.footer.confirm": "確認",
	"modal.footer.modify": "修正",
	"modal.footer.reset": "リセット",
	"modal.footer.save": "保存",
	"modal.footer.create": "作成",
	"modal.footer.delete": "削除",
	"modal.footer.search": "検索",

	"message.success.add": "追加成功",
	"message.success.edit": "編集成功",
	"message.success.delete": "削除成功",
	"message.success.operations": "操作成功",
	"message.error.add": "追加失敗",
	"message.error.edit": "編集失敗",
	"message.error.delete": "削除失敗",
	"message.error.operations": "操作失敗",

	"placeholder.prefix": "入力してください",

	...localeMessageBox,
	...localeLogin,
	...locale403,
	...locale404,
	...locale500,
	...localeCashier,
};
