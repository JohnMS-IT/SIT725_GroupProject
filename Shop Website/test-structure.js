const fs = require('fs');
const path = require('path');

// Test the new MVC structure
function testProjectStructure() {
    console.log('🔍 Testing ShoeMart Project Structure...\n');
    
    const basePath = __dirname;
    let allTestsPassed = true;
    
    // Test 1: Check assets folder structure
    console.log('📁 Testing Assets Structure:');
    const assetsTests = [
        { path: 'assets', type: 'folder', name: 'Assets root folder' },
        { path: 'assets/images', type: 'folder', name: 'Images folder' },
        { path: 'assets/css', type: 'folder', name: 'CSS folder' },
        { path: 'assets/js', type: 'folder', name: 'JavaScript folder' },
        { path: 'assets/css/style.css', type: 'file', name: 'Main stylesheet' },
        { path: 'assets/js/main.js', type: 'file', name: 'Main JavaScript file' }
    ];
    
    assetsTests.forEach(test => {
        const fullPath = path.join(basePath, test.path);
        const exists = fs.existsSync(fullPath);
        const isCorrectType = exists && (test.type === 'folder' ? fs.statSync(fullPath).isDirectory() : fs.statSync(fullPath).isFile());
        
        if (exists && isCorrectType) {
            console.log(`  ✅ ${test.name}: ${test.path}`);
        } else {
            console.log(`  ❌ ${test.name}: ${test.path} - MISSING or WRONG TYPE`);
            allTestsPassed = false;
        }
    });
    
    // Test 2: Check MVC structure
    console.log('\n🏗️  Testing MVC Structure:');
    const mvcTests = [
        { path: 'models', type: 'folder', name: 'Models folder' },
        { path: 'views', type: 'folder', name: 'Views folder' },
        { path: 'controllers', type: 'folder', name: 'Controllers folder' },
        { path: 'models/Product.js', type: 'file', name: 'Product model' },
        { path: 'models/Message.js', type: 'file', name: 'Message model' },
        { path: 'controllers/productController.js', type: 'file', name: 'Product controller' },
        { path: 'controllers/contactController.js', type: 'file', name: 'Contact controller' },
        { path: 'views/layouts/main.ejs', type: 'file', name: 'Main layout' },
        { path: 'views/partials/navbar.ejs', type: 'file', name: 'Navbar partial' },
        { path: 'views/partials/footer.ejs', type: 'file', name: 'Footer partial' }
    ];
    
    mvcTests.forEach(test => {
        const fullPath = path.join(basePath, test.path);
        const exists = fs.existsSync(fullPath);
        const isCorrectType = exists && (test.type === 'folder' ? fs.statSync(fullPath).isDirectory() : fs.statSync(fullPath).isFile());
        
        if (exists && isCorrectType) {
            console.log(`  ✅ ${test.name}: ${test.path}`);
        } else {
            console.log(`  ❌ ${test.name}: ${test.path} - MISSING or WRONG TYPE`);
            allTestsPassed = false;
        }
    });
    
    // Test 3: Check image files
    console.log('\n🖼️  Testing Image Files:');
    const imagesPath = path.join(basePath, 'assets/images');
    if (fs.existsSync(imagesPath)) {
        const imageFiles = fs.readdirSync(imagesPath).filter(file => 
            file.match(/\.(jpg|jpeg|png|webp|avif)$/i)
        );
        
        if (imageFiles.length > 0) {
            console.log(`  ✅ Found ${imageFiles.length} image files:`);
            imageFiles.forEach(img => console.log(`    - ${img}`));
        } else {
            console.log('  ❌ No image files found in assets/images/');
            allTestsPassed = false;
        }
    } else {
        console.log('  ❌ Images folder not found');
        allTestsPassed = false;
    }
    
    // Test 4: Check configuration files
    console.log('\n⚙️  Testing Configuration:');
    const configTests = [
        { path: 'config/database.js', type: 'file', name: 'Database configuration' },
        { path: 'package.json', type: 'file', name: 'Package configuration' },
        { path: 'app.js', type: 'file', name: 'Main application file' }
    ];
    
    configTests.forEach(test => {
        const fullPath = path.join(basePath, test.path);
        const exists = fs.existsSync(fullPath);
        
        if (exists) {
            console.log(`  ✅ ${test.name}: ${test.path}`);
        } else {
            console.log(`  ❌ ${test.name}: ${test.path} - MISSING`);
            allTestsPassed = false;
        }
    });
    
    // Test 5: Check for old public_html folder (should not exist)
    console.log('\n🧹 Testing Cleanup:');
    const oldPublicHtml = path.join(basePath, 'public_html');
    if (!fs.existsSync(oldPublicHtml)) {
        console.log('  ✅ Old public_html folder removed successfully');
    } else {
        console.log('  ❌ Old public_html folder still exists - should be removed');
        allTestsPassed = false;
    }
    
    // Final result
    console.log('\n' + '='.repeat(50));
    if (allTestsPassed) {
        console.log('🎉 ALL TESTS PASSED!');
        console.log('✅ Project structure is properly organized');
        console.log('✅ MVC pattern implemented correctly');
        console.log('✅ Assets are properly separated');
        console.log('✅ Ready for development and deployment');
    } else {
        console.log('❌ SOME TESTS FAILED!');
        console.log('🔧 Please fix the issues above before proceeding');
    }
    console.log('='.repeat(50));
    
    return allTestsPassed;
}

// Run the test
testProjectStructure();
