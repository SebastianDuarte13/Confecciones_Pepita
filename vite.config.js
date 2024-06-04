export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                registro: resolve(__dirname, 'registro.html'),
                calcular: resolve(__dirname, 'calcular.html'),
                informes: resolve(__dirname, 'informes.html'),
                materiaprima: resolve(__dirname, 'materiaprima.html'),
                productos: resolve(__dirname, 'productos.html'),
                costosindirectos: resolve(__dirname, 'indirectos.html'),
                eficiencia: resolve(__dirname, 'eficiencia.html'),
                manodeobra: resolve(__dirname, 'manobra.html'),
                inventario: resolve(__dirname, 'inventario.html'),
                trabajadores: resolve(__dirname, 'trabajadores.html'),
                otro: resolve(__dirname, 'otro.html'),
            }
        }
    }
})