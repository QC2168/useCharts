import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'es'
    },
    external: ['vue','echarts','echarts/renderers','echarts/core','echarts/charts','echarts/components'],
    plugins: [typescript({tsconfig:'./tsconfig.json'})]
};