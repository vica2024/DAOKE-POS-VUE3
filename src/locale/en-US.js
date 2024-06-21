import localeMessageBox from "@/components/message-box/locale/en-US";
import localeLogin from "@/views/login/locale/en-US";
import locale403 from "@/views/exception/403/locale/en-US";
import locale404 from "@/views/exception/404/locale/en-US";
import locale500 from "@/views/exception/500/locale/en-US";
import localeSettings from "./en-US/settings";

//for cashier language
import localeCashier from "@/views/cashier/locale/en-US.js";

//for customer land
import localeCustomer from "@/views/customer/locale/en-US.js";

export default {
	"menu.cashier": "Sales",
	"menu.refund": "Refund",
	"menu.deposit": "Dep.",
	"menu.redeem-coupon": "CR",
	"menu.order": "Order",
	"menu.customer": "CRM",
	"menu.dashboard": "Dashboard",
	"menu.server.dashboard": "Dashboard-Server",
	"menu.server.workplace": "Workplace-Server",
	"menu.server.monitor": "Monitor-Server",
	"menu.list": "List",
	"menu.result": "Result",
	"menu.exception": "Exception",
	"menu.form": "Form",
	"menu.profile": "Profile",
	"menu.visualization": "Data Visualization",
	"menu.arcoWebsite": "Arco Design",
	"menu.faq": "FAQ",
	"navbar.docs": "Docs",
	"navbar.action.locale": "Switch to English",

	"modal.title.add": "Add",
	"modal.title.edit": "Edit",
	"modal.title.view": "View",
	"modal.footer.cancel": "Cancel",
	"modal.footer.ok": "Ok",
	"modal.footer.save": "Save",
	"modal.footer.create": "Create",
	"modal.footer.delete": "Delete",

	"message.success.add": "Add Succeeded",
	"message.success.edit": "Edit Succeeded",
	"message.success.delete": "Delete Succeeded",
	"message.success.operations": "Action Succeeded",
	"message.error.add": "Add Error",
	"message.error.edit": "Edit Error",
	"message.error.delete": "Delete Error",
	"message.error.operations": "Action Failed",

	"placeholder.prefix":"Please enter",

	...localeSettings,
	...localeMessageBox,
	...localeLogin,
	...locale403,
	...locale404,
	...locale500,
	...localeCashier,
	...localeCustomer
};
