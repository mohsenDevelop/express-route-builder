import { CustomRouter } from '@/core/CustomRouter';
import { userController } from '@/controllers/user.controller';
import { adminRole, authorize } from '@/middlewares/auth.middleware';

// Create a new router instance
const router = new CustomRouter();


// --- User Routes ---
// -- This is the fluent API in action!

router.createRoute('/api/v1/users')
    .applyMiddleware(authorize)
    .applyMiddleware(adminRole)
    .controller({
        get: userController.getAllUsers,
        post: userController.createUser,
    });


// --- Other Routes (Example) ---
router.createRoute('/api/v1/health')
    .applyMiddleware(authorize)
    .controller({
        get: (req, res) => {
            res.status(200).json({ message: 'This is another route' });
        },
    });

export default router;