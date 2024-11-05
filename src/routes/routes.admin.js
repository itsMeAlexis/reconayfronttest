
import {AdminLayout} from "../layouts";
import {HomeAdmin, UsersAdmin, DependenciasAdmin, ContratoAdmin, ContratoOperativoAdmin, DescargaFormatosAdmin} from "../pages/Admin";

const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLayout,
        component: HomeAdmin,
        exact: true,
    },
    {
        path: "/admin/users",
        layout: AdminLayout,
        component: UsersAdmin,
        exact: true,
    },
    {
        path: "/admin/dependencias",
        layout: AdminLayout,
        component: DependenciasAdmin,
        exact: true,
    },
    {
        path: "/admin/contrato_profesional",
        layout: AdminLayout,
        component: ContratoAdmin,
        exact: true,
    },
    {
        path: "/admin/contrato_operativo",
        layout: AdminLayout,
        component: ContratoOperativoAdmin,
        exact: true,
    },
    {
        path: "/admin/descargar_formatos",
        layout: AdminLayout,
        component: DescargaFormatosAdmin,
        exact: true,
    },
    
   
];


export default routesAdmin;