-- Get all blog posts
SELECT * FROM bloggerdb.posts;

-- Get all post actions
SELECT act.post_id, act.user_ip_address,lkp.value, act.created_at FROM bloggerdb.post_actions act
INNER JOIN bloggerdb.lookup_action_types lkp on lkp.type = act.action_type
ORDER BY act.post_id, act.user_ip_address, created_at;

-- Get count of number of Likes, Undo_likes, Dislikes, and Undo_Dislikes for each post
SELECT post_id,
       SUM(CASE WHEN lkp.value = 'Like' THEN 1 ELSE 0 END) AS total_likes,
       SUM(CASE WHEN lkp.value = 'Undo_like' THEN 1 ELSE 0 END) AS total_undo_likes,
       SUM(CASE WHEN lkp.value = 'Dislike' THEN 1 ELSE 0 END) AS total_dislikes,
       SUM(CASE WHEN lkp.value = 'Undo_dislike' THEN 1 ELSE 0 END) AS total_undo_dislikes
FROM bloggerdb.post_actions act
INNER JOIN bloggerdb.lookup_action_types lkp on lkp.type = act.action_type
GROUP BY post_id;

-- Get count of number of Likes, Undo_likes, Dislikes, and Undo_Dislikes for each user_ip_address for each post, also print the net interest of the user on each post
SELECT post_id, user_ip_address,
       SUM(CASE WHEN lkp.value = 'Like' THEN 1 ELSE 0 END) AS total_likes,
       SUM(CASE WHEN lkp.value = 'Undo_like' THEN 1 ELSE 0 END) AS total_undo_likes,
       SUM(CASE WHEN lkp.value = 'Dislike' THEN 1 ELSE 0 END) AS total_dislikes,
       SUM(CASE WHEN lkp.value = 'Undo_dislike' THEN 1 ELSE 0 END) AS total_undo_dislikes,
       (CASE 
            WHEN SUM(CASE WHEN lkp.value = 'Like' THEN 1 ELSE 0 END) > SUM(CASE WHEN lkp.value = 'Undo_like' THEN 1 ELSE 0 END) THEN 'Liked'
            WHEN SUM(CASE WHEN lkp.value = 'Dislike' THEN 1 ELSE 0 END) > SUM(CASE WHEN lkp.value = 'Undo_dislike' THEN 1 ELSE 0 END) THEN 'Disliked'
            ELSE 'Neutral'
        END) AS user_post_interest
FROM bloggerdb.post_actions act
INNER JOIN bloggerdb.lookup_action_types lkp on lkp.type = act.action_type
GROUP BY post_id, user_ip_address;

-- Delete scriptsl̥
-- DELETE FROM bloggerdb.post_actions;
-- DELETE FROM bloggerdb.posts;
