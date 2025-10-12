const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertImages() {
    console.log('🔍 Procurando pastas de imagens...');
    
    // Procurar pelas pastas de imagens
    const possiblePaths = [
        './portifolio',
        '../portifolio',
        '../../portifolio',
        './imagens',
        '../imagens',
        './backgrouds',
        '../backgrouds'
    ];
    
    let portifolioPath = null;
    for (const testPath of possiblePaths) {
        if (fs.existsSync(testPath)) {
            portifolioPath = testPath;
            console.log(`✅ Pasta encontrada: ${testPath}`);
            break;
        }
    }
    
    if (!portifolioPath) {
        console.log('❌ Nenhuma pasta de imagens encontrada!');
        console.log('📁 Diretório atual:', process.cwd());
        console.log('📂 Conteúdo atual:');
        fs.readdirSync('.').forEach(file => {
            console.log(`   ${file}`);
        });
        return;
    }
    
    console.log(`\n🚀 Convertendo imagens em: ${portifolioPath}`);
    
    // Processar projetos
    const projects = fs.readdirSync(portifolioPath).filter(item => 
        fs.statSync(path.join(portifolioPath, item)).isDirectory()
    );
    
    for (const project of projects) {
        const projectPath = path.join(portifolioPath, project);
        console.log(`\n📁 Projeto: ${project}`);
        
        const images = fs.readdirSync(projectPath).filter(file => 
            /\.(jpg|jpeg|png)$/i.test(file)
        );
        
        for (const image of images) {
            const inputPath = path.join(projectPath, image);
            const outputPath = path.join(projectPath, image.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
            
            try {
                console.log(`  🔄 Convertendo: ${image}`);
                
                const originalSize = fs.statSync(inputPath).size;
                
                await sharp(inputPath)
                    .webp({ quality: 85 })
                    .toFile(outputPath);
                
                const webpSize = fs.statSync(outputPath).size;
                const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
                
                console.log(`    ✅ Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
                console.log(`    ✅ WebP: ${(webpSize / 1024 / 1024).toFixed(2)}MB`);
                console.log(`    📉 Redução: ${reduction}%`);
                
            } catch (error) {
                console.error(`    ❌ Erro: ${error.message}`);
            }
        }
    }
    
    console.log('\n🎉 Conversão concluída!');
}

convertImages().catch(console.error);
